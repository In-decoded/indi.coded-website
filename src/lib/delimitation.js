// @ts-nocheck
export function initDelimitation() {
// delimitation.js

var width = d3.select("#map-svg").node().getBoundingClientRect().width;
var height = d3.select("#map-svg").node().getBoundingClientRect().height;

// Calculate dimension ratio based on both width and height to prevent cutoff
var dimratio = Math.min(width / 800, height / 600);
if (dimratio > 1) dimratio = 1;

// Shift map to the right on desktop to avoid text box overlap
var mapCenterX = width > 768 ? width * 0.65 : width / 2;

var svg = d3.select("#map-svg");
var tooltip = d3.select(".tooltip");

var projection = d3.geo.miller()
    .scale(1000 * dimratio)  
    .translate([mapCenterX, height / 2 + 50 * dimratio])
    .center([80, 22])
    .precision(.1);

var pathn = d3.geo.path().projection(null);

var polyGeo, polyPop, polyGDP;
var currentData = {};
var statePaths;
var chartLayer;
var chartNodes;
var header;
var yScale, barScale;
var col1 = width * 0.38, col2 = width * 0.55, col3 = width * 0.70, col4 = width * 0.85;

var currentColorMetric = "Default";

var originalColors = {
    1: "#1A237E", 2: "#01579B", 3: "#006064", 4: "#004D40", 5: "#00695C",
    6: "#00796B", 7: "#1B5E20", 8: "#2E7D32", 9: "#388E3C", 10: "#558B2F",
    11: "#689F38", 12: "#AFB42B", 13: "#C0CA33", 14: "#CDDC39", 15: "#D4E157",
    16: "#FFEE58", 17: "#FFEB3B", 18: "#FDD835", 19: "#FBC02D", 20: "#F57F17",
    21: "#FF6F00", 22: "#F57C00", 23: "#FF9800", 24: "#FFB74D", 25: "#FF8A65",
    26: "#FF7043", 27: "#FF5722", 28: "#E64A19", 29: "#D84315", 30: "#BF360C"
};

function getStateColor(d) {
    if (currentColorMetric !== "Default" && colorScales[currentColorMetric]) {
        var val = d.properties[currentColorMetric];
        return val ? colorScales[currentColorMetric](val) : "#ccc";
    }
    // Fallback to the original rank-based color
    return originalColors[d.properties.Rank] || "#F2E1AF";
}

var colorScales = {
    "FertilityRate": d3.scale.linear().domain([1.0, 3.0]).range(["#fee2e2", "#7f1d1d"]),
    "GDPPerCapita": d3.scale.linear().domain([40, 450]).range(["#ecfdf5", "#064e3b"]),
    "TaxContribution": d3.scale.linear().domain([0, 15]).range(["#f3e8ff", "#3b0764"]),
    "Literacy": d3.scale.linear().domain([60, 95]).range(["#e0f2fe", "#0c4a6e"])
};

d3.json("base_map.html", function(error1, p1) {
    if (error1) throw error1;
    d3.json("population.html", function(error2, p2) {
        if (error2) throw error2;
        d3.json("geedeepee.html", function(error3, p3) {
            if (error3) throw error3;
            d3.json("data/delimitation.json", function(error4, delimData) {
                if (error4) throw error4;
                ready(null, p1, p2, p3, delimData);
            });
        });
    });
});

function ready(error, p1, p2, p3, delimData) {
    if (error) throw error;
    
    var dataMap = d3.map();
    delimData.forEach(function(d) {
        dataMap.set(d.name, d);
    });

    alignfeatureorder(p1, p2);
    alignfeatureorder(p1, p3);

    var countries = p1.features.length;
    var k = -1;
    var line1, line2, line3, mostpoints, rotation;

    while (k++ < (countries - 1)) {
        line1 = p1.features[k].geometry.coordinates[0];
        line2 = p2.features[k].geometry.coordinates[0];
        line3 = p3.features[k].geometry.coordinates[0];
        
        mostpoints = Math.max(line1.length, line2.length, line3.length);
        
        if (line1.length == mostpoints) {
            line2 = addpts(line2, 0, line2.length, line1.length);
            line3 = addpts(line3, 0, line3.length, line1.length);
        } else if (line2.length == mostpoints) {
            line1 = addpts(line1, 0, line1.length, line2.length);
            line3 = addpts(line3, 0, line3.length, line2.length);
        } else if (line3.length == mostpoints) {
            line1 = addpts(line1, 0, line1.length, line3.length);
            line2 = addpts(line2, 0, line2.length, line3.length);
        }

        p1.features[k].geometry.coordinates[0] = line1;
        p2.features[k].geometry.coordinates[0] = line2;
        p3.features[k].geometry.coordinates[0] = line3;

        rotation = calcrotation(line1, line2);
        p2.features[k].geometry.coordinates[0] = rotatearray(p2.features[k].geometry.coordinates[0], -rotation);
        rotation = calcrotation(line1, line3);
        p3.features[k].geometry.coordinates[0] = rotatearray(p3.features[k].geometry.coordinates[0], -rotation);

        p1.features[k].geometry.coordinates[0] = p1.features[k].geometry.coordinates[0].map(projection);
        p2.features[k].geometry.coordinates[0] = p2.features[k].geometry.coordinates[0].map(projection);
        p3.features[k].geometry.coordinates[0] = p3.features[k].geometry.coordinates[0].map(projection);
        
        // ensure rank exists on p1 so the default map has colors
        if (!p1.features[k].properties.Rank) {
            p1.features[k].properties.Rank = p2.features[k].properties.Rank;
        }

        // attach stats
        var stats = dataMap.get(p1.features[k].properties.name) || {};
        p1.features[k].properties = Object.assign(p1.features[k].properties, stats);
        p2.features[k].properties = Object.assign(p2.features[k].properties, stats);
        p3.features[k].properties = Object.assign(p3.features[k].properties, stats);
    }
    
    polyGeo = p1;
    polyPop = p2;
    polyGDP = p3;

    statePaths = svg.append("g").attr("class", "map-layer")
        .selectAll("path")
        .data(polyGeo.features)
        .enter()
        .append("path")
        .attr("class", "state-boundary")
        .attr("d", pathn)
        .style("fill", function(d) { return getStateColor(d); })
        .on("mouseover", showTooltipPath)
        .on("mouseout", hideTooltip);

    // Chart Layer for Step 9
    chartLayer = svg.append("g").attr("class", "chart-layer").style("opacity", 0);
    
    var chartData = [];
    polyGeo.features.forEach(function(d) {
        var stats = d.properties;
        if(stats.CurrentSeats && stats.ProjectedSeats) {
            stats.LossGain = stats.ProjectedSeats - stats.CurrentSeats;
            chartData.push(d);
        }
    });

    chartData.sort(function(a, b) {
        return a.properties.LossGain - b.properties.LossGain;
    });

    var chartY = height * 0.1;
    var chartH = height * 0.8;
    
    yScale = d3.scale.ordinal().domain(chartData.map(d => d.properties.name)).rangeBands([chartY, chartY + chartH], 0.2);
    barScale = d3.scale.linear().domain([-15, 15]).range([-150, 150]);

    // Zero line
    chartLayer.append("line")
        .attr("x1", col4)
        .attr("x2", col4)
        .attr("y1", chartY - 20)
        .attr("y2", chartY + chartH)
        .attr("stroke", "#ccc")
        .attr("stroke-dasharray", "4,4");

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
    
    chartNodes.append("text").attr("class", "c-name").text(d => d.properties.name).attr("x", col1).attr("y", 0).attr("text-anchor", "start").attr("alignment-baseline", "middle").style("opacity", 0).style("font-size", "14px").style("fill", "#333");
    chartNodes.append("text").attr("class", "c-curr").text(d => d.properties.CurrentSeats).attr("x", col2).attr("y", 0).attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("opacity", 0).style("font-size", "14px").style("fill", "#333");
    chartNodes.append("text").attr("class", "c-proj").text(d => d.properties.ProjectedSeats).attr("x", col3).attr("y", 0).attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("opacity", 0).style("font-size", "14px").style("fill", "#333");
    
    chartNodes.append("rect").attr("class", "c-bar").attr("x", col4).attr("y", -8).attr("height", 16).attr("width", 0).attr("fill", d => d.properties.LossGain < 0 ? "#f26522" : "#004b79");
    
    chartNodes.append("text")
        .attr("class", "c-lossgain")
        .text(d => d.properties.LossGain > 0 ? "+" + d.properties.LossGain : d.properties.LossGain)
        .attr("x", col4) // initial, updated in transition
        .attr("y", 0)
        .attr("text-anchor", d => d.properties.LossGain < 0 ? "end" : (d.properties.LossGain > 0 ? "start" : "middle"))
        .attr("alignment-baseline", "middle")
        .style("opacity", 0)
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("fill", "#003b5c");

    header = chartLayer.append("g").attr("class", "chart-header").style("opacity", 0);
    header.append("rect").attr("x", col1 - 10).attr("y", chartY - 40).attr("width", width * 0.62).attr("height", 35).attr("fill", "#6b4226");
    header.append("text").text("STATE").attr("x", col1).attr("y", chartY - 18).attr("text-anchor", "start").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");
    header.append("text").text("CURRENT SEATS").attr("x", col2).attr("y", chartY - 18).attr("text-anchor", "middle").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");
    header.append("text").text("PROJECTED SEATS").attr("x", col3).attr("y", chartY - 18).attr("text-anchor", "middle").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");
    header.append("text").text("LOSS/GAIN").attr("x", col4).attr("y", chartY - 18).attr("text-anchor", "middle").style("font-weight", "bold").style("font-size", "13px").style("fill", "#ffffff");

    var footer = chartLayer.append("g").attr("class", "chart-footer").style("opacity", 0);
    footer.append("text")
        .text("Note: The number of seats each state merits is calculated using the Webster method")
        .attr("x", col1 - 50)
        .attr("y", chartY + chartH + 30)
        .style("font-size", "12px")
        .style("font-style", "italic")
        .style("fill", "#666");
    footer.append("text")
        .text("Source: Based on research published by Milan Vaishnav and Jamie Hintson in March 2019 for Carnegie Endowment for International Peace")
        .attr("x", col1 - 50)
        .attr("y", chartY + chartH + 45)
        .style("font-size", "12px")
        .style("font-style", "italic")
        .style("fill", "#666");

    // Init Scrollama
    var scroller = scrollama();
    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            debug: false
        })
        .onStepEnter(handleStepEnter);
        
    window.addEventListener('resize', scroller.resize);
}

function handleStepEnter(response) {
    var el = response.element;
    var stepIndex = parseInt(d3.select(el).attr('data-step'));
    
    d3.selectAll('.step').classed('is-active', false);
    d3.select(el).classed('is-active', true);
    
    currentColorMetric = d3.select(el).attr('data-color') || "Default";

    var activePoly = polyGeo;

    if (stepIndex === 1) {
        activePoly = polyGeo;
    } else if (stepIndex === 2 || stepIndex === 3 || stepIndex === 5 || stepIndex === 7 || stepIndex === 8) {
        activePoly = polyPop;
    } else if (stepIndex === 4 || stepIndex === 6) {
        activePoly = polyGDP;
    }
    
    if (stepIndex === 9) {
        statePaths.transition().duration(1000).style("opacity", 0);
        chartLayer.style("opacity", 1);
        header.transition().duration(1000).style("opacity", 1);
        chartLayer.select(".chart-footer").transition().duration(1000).style("opacity", 1);
        
        chartNodes.transition().duration(1500)
            .attr("transform", function(d) {
                return "translate(0," + yScale(d.properties.name) + ")";
            });
            
        chartNodes.selectAll("text, rect.row-bg, line").transition().duration(1500).style("opacity", 1);
        
        chartNodes.selectAll("rect.c-bar").transition().duration(1500).delay(500)
            .attr("x", function(d) {
                var w = barScale(d.properties.LossGain) - barScale(0);
                return d.properties.LossGain < 0 ? col4 + w : col4;
            })
            .attr("width", function(d) {
                return Math.abs(barScale(d.properties.LossGain) - barScale(0));
            });
            
        chartNodes.selectAll("text.c-lossgain").transition().duration(1500).delay(500)
            .attr("x", function(d) {
                var offset = barScale(d.properties.LossGain);
                if (d.properties.LossGain < 0) return col4 + offset - 5;
                else if (d.properties.LossGain > 0) return col4 + offset + 5;
                else return col4;
            });
    } else {
        if (chartLayer.style("opacity") > 0) {
            header.transition().duration(500).style("opacity", 0);
            chartLayer.select(".chart-footer").transition().duration(500).style("opacity", 0);
            chartNodes.selectAll("text").transition().duration(500).style("opacity", 0);
            chartNodes.selectAll("rect.c-bar").transition().duration(500).attr("width", 0).attr("x", col4);
            
            chartNodes.transition().duration(1000).delay(500)
                .attr("transform", function(d) {
                    var centroid = pathn.centroid(d);
                    return "translate(" + (centroid[0] || width/2) + "," + (centroid[1] || height/2) + ")";
                });
                
            chartLayer.transition().duration(500).delay(1500).style("opacity", 0);
        }
        morphPaths(activePoly);
    }
}

function morphPaths(polyData) {
    statePaths.data(polyData.features)
        .transition().duration(1500)
        .style("opacity", 1)
        .attr("d", pathn)
        .style("fill", function(d) {
            if (currentColorMetric !== "Default" && colorScales[currentColorMetric]) {
                var val = d.properties[currentColorMetric];
                return val ? colorScales[currentColorMetric](val) : "#ccc";
            }
            return getStateColor(d);
        });
}

function showTooltipPath(d) {
    var data = d.properties;
    if (!data || !data.name) return;
    
    var html = "<strong>" + data.name + "</strong><br/>";
    if (data.CurrentSeats) html += "Current Seats: " + data.CurrentSeats + "<br/>";
    if (data.ProjectedSeats) html += "Projected Seats: " + data.ProjectedSeats + "<br/>";
    if (data.Population) html += "Population: " + data.Population + "m<br/>";
    if (data.FertilityRate) html += "Fertility: " + data.FertilityRate + "<br/>";
    if (data.GDPPerCapita) html += "GDP/Capita: INR " + data.GDPPerCapita + "k<br/>";
    if (data.Literacy) html += "Literacy: " + data.Literacy + "%<br/>";
    if (data.TaxContribution) html += "Tax: " + data.TaxContribution + "%<br/>";
    
    tooltip.html(html)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 28) + "px")
        .transition().duration(200)
        .style("opacity", .9);
}

function hideTooltip() {
    tooltip.transition().duration(300).style("opacity", 0);
}


// Math utilities from main.js

function addpts(linearr, startp, counts, counte) {
    var linearrnew = linearr;
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

function rotatearray(a, inc) {
    a.splice(0,1)
    for (var l = a.length, inc = (Math.abs(inc) >= l && (inc %= l), inc < 0 && (inc += l), inc), i, x; inc; inc = (Math.ceil(l / inc) - 1) * inc - l + (l = inc))
    for (i = l; i > inc; x = a[--i], a[i] = a[i - inc], a[i - inc] = x);
    a.splice(0,0,a[a.length-1]);
    return a;
};

function alignfeatureorder(poly1, poly2) {
    var i = 0;
    var j = 0;
    var tempfeature;
    var n = poly1.features.length;
    while (++i < n) {
        j = 0;
        while (++j < n) {
            if (+poly1.features[j-1].properties.code > +poly1.features[j].properties.code){
                tempfeature = poly1.features[j-1];
                poly1.features[j-1] = poly1.features[j];
                poly1.features[j] = tempfeature;
            }
            if (+poly2.features[j-1].properties.code > +poly2.features[j].properties.code){
                tempfeature = poly2.features[j-1];
                poly2.features[j-1] = poly2.features[j];
                poly2.features[j] = tempfeature;
            }
        }
    }
    return [poly1, poly2];
}

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

}
