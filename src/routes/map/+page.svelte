<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let svgElement;
    let width = 800;
    let height = 800;
    let tooltip;

    // Dummy Data for Poverty Rates by State
    // Matching the format of 'STNAME_SH' from INDIA_STATES.geojson
    const povertyData = [
        { state_name: "Andhra Pradesh", poverty_rate: 9.2 },
        { state_name: "Arunachal Pradesh", poverty_rate: 34.6 },
        { state_name: "Assam", poverty_rate: 31.9 },
        { state_name: "Bihar", poverty_rate: 51.9 },
        { state_name: "Chhattisgarh", poverty_rate: 39.9 },
        { state_name: "Goa", poverty_rate: 5.0 },
        { state_name: "Gujarat", poverty_rate: 11.6 },
        { state_name: "Haryana", poverty_rate: 11.1 },
        { state_name: "Himachal Pradesh", poverty_rate: 8.0 },
        { state_name: "Jharkhand", poverty_rate: 42.1 },
        { state_name: "Karnataka", poverty_rate: 13.1 },
        { state_name: "Kerala", poverty_rate: 0.7 },
        { state_name: "Madhya Pradesh", poverty_rate: 36.6 },
        { state_name: "Maharashtra", poverty_rate: 14.8 },
        { state_name: "Manipur", poverty_rate: 36.8 },
        { state_name: "Meghalaya", poverty_rate: 32.6 },
        { state_name: "Mizoram", poverty_rate: 20.4 },
        { state_name: "Nagaland", poverty_rate: 22.7 },
        { state_name: "Odisha", poverty_rate: 29.3 },
        { state_name: "Punjab", poverty_rate: 5.5 },
        { state_name: "Rajasthan", poverty_rate: 29.4 },
        { state_name: "Sikkim", poverty_rate: 3.8 },
        { state_name: "Tamil Nadu", poverty_rate: 4.8 },
        { state_name: "Telangana", poverty_rate: 13.7 },
        { state_name: "Tripura", poverty_rate: 14.0 },
        { state_name: "Uttar Pradesh", poverty_rate: 37.7 },
        { state_name: "Uttarakhand", poverty_rate: 17.7 },
        { state_name: "West Bengal", poverty_rate: 21.4 },
        { state_name: "Jammu & Kashmir", poverty_rate: 12.5 }
    ];

    // Convert array to Map for fast lookups
    const dataMap = new Map(povertyData.map(d => [d.state_name, d]));

    // Define the D3 Color Scale (White to Dark Red)
    // Domain goes from 0% to 60% poverty
    const colorScale = d3.scale.linear()
        .domain([0, 60])
        .range(["#fff5f0", "#67000d"]);

    onMount(async () => {
        // Fetch the GeoJSON from the static/data folder
        const response = await fetch('/data/INDIA_STATES.geojson');
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
                // Using the property from your geojson file
                const stateName = d.properties.STNAME_SH || d.properties.STNAME;
                const stateStats = dataMap.get(stateName);
                
                return stateStats ? colorScale(stateStats.poverty_rate) : '#cccccc'; // Grey if no data
            })
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 0.5)
            // Tooltip interactivity
            .on('mousemove', function(event, d) {
                const stateName = d.properties.STNAME_SH || d.properties.STNAME;
                const stateStats = dataMap.get(stateName);
                const rate = stateStats ? `${stateStats.poverty_rate}%` : 'No Data';
                
                d3.select(this).attr('stroke-width', 2).attr('stroke', '#000');
                
                tooltip.style.opacity = 1;
                tooltip.style.left = (event.pageX + 15) + 'px';
                tooltip.style.top = (event.pageY - 28) + 'px';
                tooltip.innerHTML = `<strong>${stateName}</strong><br/>Poverty Rate: ${rate}`;
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
            <h1>India Poverty Rate Map</h1>
            <p>Visualizing poverty rate data using the newly imported Indian States GeoJSON</p>
        </header>

        <section class="map-section">
            <svg bind:this={svgElement}></svg>
            
            <div class="legend">
                <p class="legend-title">Poverty Rate (%)</p>
                <div class="gradient-bar"></div>
                <div class="legend-labels">
                    <span>0%</span>
                    <span>30%</span>
                    <span>60%+</span>
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
        background-color: #fcfbf8;
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
    
    path {
        transition: stroke-width 0.2s, opacity 0.2s;
        cursor: pointer;
    }
    
    path:hover {
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
        background: linear-gradient(to right, #fff5f0, #fb6a4a, #67000d);
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
