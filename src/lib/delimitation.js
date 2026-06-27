// @ts-nocheck
import * as turf from '@turf/turf';

export async function initDelimitation() {
    var width = d3.select("#map-svg").node().getBoundingClientRect().width;
    var height = d3.select("#map-svg").node().getBoundingClientRect().height;

    var dimratio = Math.min(width / 800, height / 600);
    if (dimratio > 1) dimratio = 1;

    var mapCenterX = width / 2;

    var svg = d3.select("#map-svg");
    var tooltip = d3.select(".tooltip");
    var pathn;

    var mapDatasets = {};
    var statePaths;
    var chartLayer;
    var chartNodes;
    var header;
    var yScale, barScale;
    var col1 = width * 0.38, col2 = width * 0.50, col3 = width * 0.62, col4 = width * 0.82;

    var currentColorMetric = "Base";

    var originalColors = {
        1: "#1A237E", 2: "#01579B", 3: "#006064", 4: "#004D40", 5: "#00695C",
        6: "#00796B", 7: "#1B5E20", 8: "#2E7D32", 9: "#388E3C", 10: "#558B2F",
        11: "#689F38", 12: "#AFB42B", 13: "#C0CA33", 14: "#CDDC39", 15: "#D4E157",
        16: "#FFEE58", 17: "#FFEB3B", 18: "#FDD835", 19: "#FBC02D", 20: "#F57F17",
        21: "#FF6F00", 22: "#F57C00", 23: "#FF9800", 24: "#FFB74D", 25: "#FF8A65",
        26: "#FF7043", 27: "#FF5722", 28: "#E64A19", 29: "#D84315", 30: "#BF360C"
    };

    var colorScales = {
        "Population": d3.scale.linear().domain([0, 220]).range(["#fef9c3", "#a16207"]),
        "FertilityRate": d3.scale.linear().domain([1.0, 3.0]).range(["#fee2e2", "#7f1d1d"]),
        "GDPPerCapita": d3.scale.linear().domain([40, 450]).range(["#ecfdf5", "#064e3b"]),
        "TaxContribution": d3.scale.linear().domain([0, 15]).range(["#f3e8ff", "#3b0764"]),
        "Literacy": d3.scale.linear().domain([60, 95]).range(["#e0f2fe", "#0c4a6e"])
    };

    var propMapping = {
        "Population": "POPULATION",
        "FertilityRate": "FERTILITY",
        "GDPPerCapita": "GDPCAPITA",
        "TaxContribution": "TAX_CONT",
        "Literacy": "LITERACY"
    };

    function getStateColor(d, targetKey) {
        if (targetKey && propMapping[targetKey] && colorScales[targetKey]) {
            var val = d.properties[propMapping[targetKey]];
            return val ? colorScales[targetKey](val) : "#cccccc";
        }
        return originalColors[(parseInt(d.properties.STCODE11) % 30) + 1] || "#F2E1AF";
    }

    const files = [
        { key: "Base", file: "Current Map.geojson" },
        { key: "CurrentSeats", file: "Current Seats.geojson" },
        { key: "Population", file: "Population.geojson" },
        { key: "ProjectedSeats", file: "Projected Seats.geojson" },
        { key: "FertilityRate", file: "Fertility.geojson" },
        { key: "GDPPerCapita", file: "GDP.geojson" },
        { key: "TaxContribution", file: "TAX.geojson" },
        { key: "Literacy", file: "Literacy.geojson" }
    ];

    try {
        const responses = await Promise.all(files.map(f => fetch('/data/' + f.file)));
        const jsons = await Promise.all(responses.map(r => r.json()));
        
        jsons.forEach((data, i) => {
            data.features.sort((a, b) => (a.properties.STNAME_SH || "").localeCompare(b.properties.STNAME_SH || ""));
            
            data.features.forEach(f => {
                if (f.geometry.type === "MultiPolygon") {
                    var maxPoints = 0;
                    var largestPoly = f.geometry.coordinates[0];
                    f.geometry.coordinates.forEach(poly => {
                        if (poly[0].length > maxPoints) {
                            maxPoints = poly[0].length;
                            largestPoly = poly;
                        }
                    });
                    f.geometry.coordinates = [largestPoly];
                }
                
                // Drastically simplify the shapes to ~200 vertices maximum.
                // This makes the O(N^2) calcrotation run instantly, eliminating browser freezing
                // while keeping the shapes visually identical.
                turf.simplify(f, {tolerance: 5000, highQuality: true, mutate: true});
            });

            mapDatasets[files[i].key] = data;
        });

        ready(null);
    } catch(err) {
        console.error("Error loading geojsons:", err);
    }

    function ready(error) {
        if (error) throw error;
        
        var baseGeo = mapDatasets["Base"];

        // Compute Transform
        var bbox = turf.bbox(baseGeo);
        var minX = bbox[0], minY = bbox[1], maxX = bbox[2], maxY = bbox[3];
        var margin = 20;
        var scale = Math.min((width - 2 * margin) / (maxX - minX), (height - 2 * margin) / (maxY - minY));
        var tx = mapCenterX - scale * (maxX + minX) / 2;
        var ty = (height / 2) + scale * (maxY + minY) / 2;

        var numFeatures = baseGeo.features.length;
        var mapKeys = files.map(f => f.key);
        var baseKey = "Base";

        // Mathematical Alignment Process across all 8 maps!
        for (var k = 0; k < numFeatures; k++) {
            var mostpoints = 0;
            mapKeys.forEach(key => {
                var line = mapDatasets[key].features[k].geometry.coordinates[0][0];
                if (line.length > mostpoints) mostpoints = line.length;
            });

            // Pad base map
            var baseLine = mapDatasets[baseKey].features[k].geometry.coordinates[0][0];
            if (baseLine.length < mostpoints) {
                baseLine = addpts(baseLine, 0, baseLine.length, mostpoints);
            }

            // Project base map
            mapDatasets[baseKey].features[k].geometry.coordinates[0][0] = baseLine.map(p => {
                return [p[0] * scale + tx, -p[1] * scale + ty];
            });

            // Process all other maps
            mapKeys.forEach(key => {
                if (key === baseKey) return;
                var line = mapDatasets[key].features[k].geometry.coordinates[0][0];
                
                if (line.length < mostpoints) {
                    line = addpts(line, 0, line.length, mostpoints);
                }
                
                var rotation = calcrotation(baseLine, line);
                line = rotatearray(line, -rotation);
                
                mapDatasets[key].features[k].geometry.coordinates[0][0] = line.map(p => {
                    return [p[0] * scale + tx, -p[1] * scale + ty];
                });
            });
        }

        // We bypass projection now because we mapped the pixels natively!
        pathn = d3.geo.path().projection(null);

        statePaths = svg.append("g").attr("class", "map-layer")
            .selectAll("path")
            .data(baseGeo.features)
            .enter()
            .append("path")
            .attr("class", "state-boundary")
            .attr("d", pathn)
            .style("fill", function(d) { return getStateColor(d, "Base"); })
            .style("stroke", "#000000")
            .style("stroke-width", 0.5)
            .on("mouseover", showTooltipPath)
            .on("mouseout", hideTooltip);

        // Chart Layer setup
        chartLayer = svg.append("g").attr("class", "chart-layer").style("opacity", 0);
        
        var chartData = [];
        baseGeo.features.forEach(function(d) {
            var stats = d.properties;
            if(stats.CURR_SEATS && stats.PR_SEATS) {
                stats.LossGain = stats.PR_SEATS - stats.CURR_SEATS;
                chartData.push(d);
            }
        });

        chartData.sort(function(a, b) { return a.properties.LossGain - b.properties.LossGain; });

        var chartY = height * 0.1;
        var chartH = height * 0.8;
        
        yScale = d3.scale.ordinal().domain(chartData.map(d => d.properties.STNAME_SH)).rangeBands([chartY, chartY + chartH], 0.2);
        barScale = d3.scale.linear().domain([-15, 15]).range([-150, 150]);

        chartLayer.append("line").attr("x1", col4).attr("x2", col4).attr("y1", chartY - 20).attr("y2", chartY + chartH).attr("stroke", "#ccc").attr("stroke-dasharray", "4,4");

        chartNodes = chartLayer.selectAll(".chart-row")
            .data(chartData)
            .enter()
            .append("g")
            .attr("class", "chart-row")
            .attr("transform", function(d) {
                var centroid = pathn.centroid(d);
                return "translate(" + (centroid[0] || width/2) + "," + (centroid[1] || height/2) + ")";
            });

        chartNodes.append("rect").attr("class", "row-bg").attr("x", col1 - 10).attr("y", -yScale.rangeBand()/2).attr("width", width * 0.62).attr("height", yScale.rangeBand() * 1.2).attr("fill", (d, i) => i % 2 === 0 ? "#ffffff" : "#fdfbf2").style("opacity", 0);
        chartNodes.append("line").attr("x1", col1 - 10).attr("x2", col1 - 10 + width * 0.62).attr("y1", yScale.rangeBand()/2 * 1.2).attr("y2", yScale.rangeBand()/2 * 1.2).attr("stroke", "#eadecc").attr("stroke-width", 1).style("opacity", 0);
        chartNodes.append("text").attr("class", "c-name").text(d => d.properties.STNAME_SH).attr("x", col1).attr("y", 0).attr("text-anchor", "start").attr("alignment-baseline", "middle").style("opacity", 0).style("font-size", "14px").style("fill", "#333");
        chartNodes.append("text").attr("class", "c-curr").text(d => d.properties.CURR_SEATS).attr("x", col2).attr("y", 0).attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("opacity", 0).style("font-size", "14px").style("fill", "#333");
        chartNodes.append("text").attr("class", "c-proj").text(d => d.properties.PR_SEATS).attr("x", col3).attr("y", 0).attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("opacity", 0).style("font-size", "14px").style("fill", "#333");
        chartNodes.append("rect").attr("class", "c-bar").attr("x", col4).attr("y", -8).attr("height", 16).attr("width", 0).attr("fill", d => d.properties.LossGain < 0 ? "#f26522" : "#004b79");
        chartNodes.append("text")
            .attr("class", "c-lossgain")
            .text(d => d.properties.LossGain > 0 ? "+" + d.properties.LossGain : d.properties.LossGain)
            .attr("x", col4) 
            .attr("y", 0)
            .attr("text-anchor", d => d.properties.LossGain < 0 ? "end" : (d.properties.LossGain > 0 ? "start" : "middle"))
            .attr("alignment-baseline", "middle")
            .style("opacity", 0).style("font-size", "14px").style("font-weight", "600").style("fill", "#003b5c");

        header = chartLayer.append("g").attr("class", "chart-header").style("opacity", 0);
        header.append("rect").attr("x", col1 - 10).attr("y", chartY - 40).attr("width", width * 0.62).attr("height", 35).attr("fill", "#6b4226");
        header.append("text").text("STATE").attr("x", col1).attr("y", chartY - 18).attr("text-anchor", "start").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");
        header.append("text").text("CURRENT SEATS").attr("x", col2).attr("y", chartY - 18).attr("text-anchor", "middle").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");
        header.append("text").text("PROJECTED SEATS").attr("x", col3).attr("y", chartY - 18).attr("text-anchor", "middle").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");
        header.append("text").text("LOSS/GAIN").attr("x", col4).attr("y", chartY - 18).attr("text-anchor", "middle").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");

        var footer = chartLayer.append("g").attr("class", "chart-footer").style("opacity", 0);
        footer.append("text").text("Note: The number of seats each state merits is calculated using the Webster method").attr("x", col1 - 50).attr("y", chartY + chartH + 30).style("font-size", "12px").style("font-style", "italic").style("fill", "#666");
        footer.append("text").text("Source: Based on research published by Milan Vaishnav and Jamie Hintson in March 2019").attr("x", col1 - 50).attr("y", chartY + chartH + 45).style("font-size", "12px").style("font-style", "italic").style("fill", "#666");

        if (typeof scrollama !== 'undefined') {
            var scroller = scrollama();
            scroller.setup({ step: '.step', offset: 0.5, debug: false }).onStepEnter(handleStepEnter);
            window.addEventListener('resize', scroller.resize);
        }
    }

    function morphPaths(targetKey, isHidden) {
        var targetGeo = mapDatasets[targetKey] || mapDatasets["Base"];
        currentColorMetric = targetKey;

        statePaths.transition().duration(1500)
            .style("opacity", isHidden ? 0 : 1)
            .style("fill", function(d) { return getStateColor(d, targetKey); })
            // Replaced d3-interpolate-path with native D3 tweening since points perfectly align!
            .attr("d", function(d, i) {
                return pathn(targetGeo.features[i]);
            });
    }

    function handleStepEnter(response) {
        var el = response.element;
        var stepIndex = parseInt(d3.select(el).attr('data-step'));
        
        d3.selectAll('.step').classed('is-active', false);
        d3.select(el).classed('is-active', true);
        
        var targetKey = "Base";
        if (stepIndex === 1) targetKey = "Base";
        if (stepIndex === 2) targetKey = "CurrentSeats";
        if (stepIndex === 3) targetKey = "ProjectedSeats";
        if (stepIndex === 4) targetKey = "ProjectedSeats";
        if (stepIndex === 5) targetKey = "Population";
        if (stepIndex === 6) targetKey = "FertilityRate";
        if (stepIndex === 7) targetKey = "GDPPerCapita";
        if (stepIndex === 8) targetKey = "TaxContribution";
        if (stepIndex === 9) targetKey = "Literacy";
        if (stepIndex === 45 || stepIndex === 46) targetKey = "ProjectedSeats";
        var isHidden = false;

        if (stepIndex === 45 || stepIndex === 46) {
            d3.select('#map-svg').transition().duration(500).style("opacity", 0);
            if (chartLayer && chartLayer.style("opacity") > 0) {
                header.transition().duration(500).style("opacity", 0);
                chartLayer.select(".chart-footer").transition().duration(500).style("opacity", 0);
                chartLayer.transition().duration(500).style("opacity", 0);
            }
        } else if (stepIndex === 10) {
            d3.select('#map-svg').transition().duration(500).style("opacity", 1);
            statePaths.transition().duration(1000).style("opacity", 0);
            chartLayer.style("opacity", 1);
            header.transition().duration(1000).style("opacity", 1);
            chartLayer.select(".chart-footer").transition().duration(1000).style("opacity", 1);
            
            chartNodes.transition().duration(1500).attr("transform", function(d) { return "translate(0," + yScale(d.properties.STNAME_SH) + ")"; });
            chartNodes.selectAll("text, rect.row-bg, line").transition().duration(1500).style("opacity", 1);
            chartNodes.selectAll("rect.c-bar").transition().duration(1500).delay(500)
                .attr("x", function(d) { var w = barScale(d.properties.LossGain) - barScale(0); return d.properties.LossGain < 0 ? col4 + w : col4; })
                .attr("width", function(d) { return Math.abs(barScale(d.properties.LossGain) - barScale(0)); });
            chartNodes.selectAll("text.c-lossgain").transition().duration(1500).delay(500)
                .attr("x", function(d) {
                    var offset = barScale(d.properties.LossGain);
                    if (d.properties.LossGain < 0) return col4 + offset - 5;
                    else if (d.properties.LossGain > 0) return col4 + offset + 5;
                    else return col4;
                });
        } else {
            d3.select('#map-svg').transition().duration(500).style("opacity", 1);
            if (chartLayer && chartLayer.style("opacity") > 0) {
                header.transition().duration(500).style("opacity", 0);
                chartLayer.select(".chart-footer").transition().duration(500).style("opacity", 0);
                chartNodes.selectAll("text").transition().duration(500).style("opacity", 0);
                chartNodes.selectAll("rect.c-bar").transition().duration(500).attr("width", 0).attr("x", col4);
                
                chartNodes.transition().duration(1000).delay(500).attr("transform", function(d) {
                    var centroid = pathn.centroid(d);
                    return "translate(" + (centroid[0] || width/2) + "," + (centroid[1] || height/2) + ")";
                });
                chartLayer.transition().duration(500).delay(1500).style("opacity", 0);
            }
            morphPaths(targetKey, isHidden);
        }
    }

    function showTooltipPath(d) {
        var data = d.properties;
        var name = data.STNAME_SH || data.STNAME;
        if (!name) return;
        var html = "<strong>" + name + "</strong><br/>";
        if (data.CURR_SEATS) html += "Current Seats: " + data.CURR_SEATS + "<br/>";
        if (data.PR_SEATS) html += "Projected Seats: " + data.PR_SEATS + "<br/>";
        if (data.POPULATION) html += "Population: " + data.POPULATION + "m<br/>";
        if (data.FERTILITY) html += "Fertility: " + data.FERTILITY + "<br/>";
        if (data.GDPCAPITA) html += "GDP/Capita: INR " + data.GDPCAPITA + "k<br/>";
        if (data.LITERACY) html += "Literacy: " + data.LITERACY + "%<br/>";
        if (data.TAX_CONT) html += "Tax: " + data.TAX_CONT + "%<br/>";
        
        tooltip.html(html).style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 28) + "px").transition().duration(200).style("opacity", .9);
    }

    function hideTooltip() { tooltip.transition().duration(300).style("opacity", 0); }
}

// Mathematical Alignment Functions
function addpts(linearr, startp, counts, counte) {
    // Clone array to prevent mutating shared references across calls
    var linearrnew = linearr.slice();
    var i = -1;
    var addnum = - counts + counte;
    var spacing = counts / (addnum + 1);
    var addindex;
    var priorindex;
    var newval0;
    var newval1;
    while (++i < addnum) {
        addindex = (startp + Math.round((i+1)*spacing) + i+1) % linearrnew.length;
        if (addindex == 0) {addindex = 1;}
        priorindex = (addindex - 1  + linearrnew.length) % linearrnew.length;
        newval0 = (linearrnew[priorindex][0] + linearrnew[addindex][0])/2;
        newval1 = (linearrnew[priorindex][1] + linearrnew[addindex][1])/2 + 0.00000000001;
        linearrnew.splice(addindex, 0, [newval0, newval1]);
    }
    return linearrnew;
}

function rotatearray(arr, inc) {
    var a = arr.slice();
    a.splice(0,1);
    for (var l = a.length, inc = (Math.abs(inc) >= l && (inc %= l), inc < 0 && (inc += l), inc), i, x; inc; inc = (Math.ceil(l / inc) - 1) * inc - l + (l = inc))
    for (i = l; i > inc; x = a[--i], a[i] = a[i - inc], a[i - inc] = x);
    a.splice(0,0,a[a.length-1]);
    return a;
};

function calcrotation(line1, line2) {
    var l1 = line1;
    var l2 = line2;
    var len = line1.length;
    var i, j;
    var temparr = [];
    var resultarr = [];
    var mindist = [-9999,9999];
    for (i = 0; i < len; i++){
        for (j = 0; j < len; j++){
            temparr[j] = dist(l1[j], l2[(i + j) % len]);
        }    
        resultarr[i] = avg(temparr);
        if (resultarr[i][0] < mindist[1]) {
            mindist[0] = i;
            mindist[1] = resultarr[i][0];
        }
    }
    return mindist[0];
}

function dist(p1, p2){
    return Math.sqrt((p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1]));
}

function avg(arr) {
    var i;
    var tot = 0;
    var avg1 = 0;
    var stdv = 0;
    for (i = 0; i < arr.length; i++){
        tot = tot + arr[i]
    }
    avg1 = tot / arr.length;
    tot = 0;
    for (i = 0; i < arr.length; i++){
        tot += (arr[i] - avg1) * (arr[i] - avg1);
    }
    tot = tot / (arr.length - 1);
    stdv = Math.sqrt(tot);
    return [avg1, stdv];
}
