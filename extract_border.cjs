const fs = require('fs');
const turf = require('@turf/turf');

const apState = JSON.parse(fs.readFileSync('static/data/ap_state.json'));
const baseMap = JSON.parse(fs.readFileSync('static/base_map.html'));
let undividedAp = baseMap.features.find(f => f.properties.name === 'Andhra Pradesh');
let boundary = turf.polygonToLine(undividedAp);

let coords = apState.features[0].geometry.coordinates;
let borderPoints = [];

coords.forEach(poly => {
    let ring = poly[0];
    let currentSegment = [];
    
    for (let i = 0; i < ring.length; i++) {
        let pt = turf.point(ring[i]);
        let dist = turf.pointToLineDistance(pt, boundary, {units: 'degrees'});
        
        // If distance is > 0.015 degrees, it's definitely the internal border
        if (dist > 0.015) {
            currentSegment.push(ring[i]);
        } else {
            if (currentSegment.length > 50) {
                // To close the gap, add 5 points before and after
                let startIdx = Math.max(0, i - currentSegment.length - 5);
                let endIdx = Math.min(ring.length - 1, i + 5);
                let segment = ring.slice(startIdx, endIdx);
                borderPoints.push(segment);
            }
            currentSegment = [];
        }
    }
    if (currentSegment.length > 50) {
        borderPoints.push(currentSegment);
    }
});

let out = {
    type: 'FeatureCollection',
    features: borderPoints.map(seg => ({
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: seg },
        properties: {}
    }))
};

fs.writeFileSync('static/data/ap_tg_border.json', JSON.stringify(out));
