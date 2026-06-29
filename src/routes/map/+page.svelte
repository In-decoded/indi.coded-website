<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let svgElement;
    let width = 800;
    let height = 800;
    let tooltip;

    // Define the D3 Color Scale (Light Green to Dark Green for GDP)
    // Domain goes from 0 to 600 (min is ~54, max is ~530)
    const colorScale = d3.scale.linear()
        .domain([0, 600])
        .range(["#f7fcf5", "#00441b"]);

    onMount(async () => {
        // Fetch the GeoJSON from the static/data folder
        const response = await fetch('/delimitation/data/GDP.geojson');
        const geojson = await response.json();

        // Setup D3 Projection tailored for India
        const projection = d3.geo.mercator()
            .center([82.8, 23.5]) // Center coordinates of India
            .scale(1200)          // Zoom level
            .translate([width / 2, height / 2]);

        const pathGenerator = d3.geo.path().projection(projection);

        const svg = d3.select(svgElement)
            .attr('width', width)
            .attr('height', height);

        // Draw the map
        svg.selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', pathGenerator)
            .attr('fill', d => {
                const gdp = d.properties.GDPCAPITA;
                return gdp ? colorScale(gdp) : '#cccccc'; // Grey if no data
            })
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 0.5)
            // Tooltip interactivity
            .on('mousemove', function(event, d) {
                const stateName = d.properties.STNAME_SH || d.properties.STNAME;
                const gdp = d.properties.GDPCAPITA;
                const rate = gdp ? `$${gdp}k` : 'No Data';
                
                d3.select(this).attr('stroke-width', 2).attr('stroke', '#000');
                
                tooltip.style.opacity = 1;
                tooltip.style.left = (event.pageX + 15) + 'px';
                tooltip.style.top = (event.pageY - 28) + 'px';
                tooltip.innerHTML = `<strong>${stateName}</strong><br/>GDP per Capita: ${rate}`;
            })
            .on('mouseout', function() {
                d3.select(this).attr('stroke-width', 0.5).attr('stroke', '#ffffff');
                tooltip.style.opacity = 0;
            });
    });
</script>

<div class="page-container">
    <nav class="top-nav">
        <div class="nav-left">
            <a href="/"><span>indi.coded</span></a>
        </div>
        <div class="nav-right">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
    </nav>

    <main class="main-content">
        <header class="page-header">
            <h1>India GDP per Capita Map</h1>
            <p>Visualizing GDP per capita data using the GDP GeoJSON</p>
        </header>

        <section class="map-section">
            <svg bind:this={svgElement}></svg>
            
            <div class="legend">
                <p class="legend-title">GDP per Capita ($k)</p>
                <div class="gradient-bar"></div>
                <div class="legend-labels">
                    <span>$0</span>
                    <span>$300</span>
                    <span>$600+</span>
                </div>
            </div>
        </section>
    </main>

    <!-- Tooltip Element -->
    <div bind:this={tooltip} class="tooltip"></div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Inter", sans-serif;
        background-color: rgb(242, 225, 175);
        color: #1a1a1a;
    }

    .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    /* --- NAVBAR --- */
    .top-nav {
        position: fixed;
        top: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 3rem);
        max-width: 1200px;
        box-sizing: border-box;
        z-index: 50;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2.5rem;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-radius: 100px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        border: none;
    }

    .nav-left a {
        text-decoration: none;
    }

    .nav-left span {
        font-family: "Inter", sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        letter-spacing: -0.04em;
        color: #3e2723;
    }

    .nav-right {
        display: flex;
        gap: 3rem;
        align-items: center;
    }

    .nav-right a {
        color: rgba(62, 39, 35, 0.7);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: color 0.3s ease;
    }

    .nav-right a:hover {
        color: #3e2723;
    }

    /* --- MAIN CONTENT --- */
    .main-content {
        flex: 1;
        padding: 10rem 2rem 6rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-header {
        max-width: 700px;
        text-align: center;
        margin-bottom: 2rem;
    }

    .page-header h1 {
        font-family: "Instrument Serif", serif;
        font-size: 4rem;
        font-weight: 400;
        color: #3e2723;
        margin: 0 0 1rem 0;
    }

    .page-header p {
        font-family: "Inter", sans-serif;
        font-size: 1.2rem;
        font-weight: 300;
        line-height: 1.6;
        color: #5d4037;
        margin: 0;
    }

    .map-section {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(62, 39, 35, 0.05);
        border: 1px solid rgba(62, 39, 35, 0.05);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tooltip {
        position: absolute;
        opacity: 0;
        background: white;
        padding: 12px;
        border: 1px solid #eee;
        border-radius: 8px;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 14px;
        z-index: 100;
        transition: opacity 0.2s;
    }
    
    :global(.map-section path) {
        transition: stroke-width 0.2s, opacity 0.2s;
        cursor: pointer;
    }
    
    :global(.map-section path:hover) {
        opacity: 0.8;
    }

    .legend {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 300px;
    }

    .legend-title {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        color: #3e2723;
    }

    .gradient-bar {
        width: 100%;
        height: 12px;
        border-radius: 6px;
        background: linear-gradient(to right, #f7fcf5, #41ab5d, #00441b);
    }

    .legend-labels {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        color: #5d4037;
    }
</style>
