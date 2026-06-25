<svelte:head>
    <title>About | indi.coded</title>
</svelte:head>

<div class="about-page">
    <nav class="top-nav">
        <div class="nav-left">
            <a href="/" class="logo">indi.coded</a>
        </div>
        <div class="nav-right">
            <a href="/about">About</a>
            <a href="#">Contact</a>
        </div>
    </nav>

    <main class="content">
        <h1>About the Project</h1>
        <p>In.decoded is an ongoing archive of experiments. By treating culture as a system, we use code to decode patterns, narratives, and historical artifacts.</p>
        <p>This is a space where technology meets tradition, creating new ways to see familiar stories. Through data visualization, generative art, and computational narratives, we aim to bridge the gap between ancient wisdom and modern algorithms.</p>
        
        <h2>Our Approach</h2>
        <p>We believe that code is a medium for cultural expression. Just as artisans wove stories into textiles or carved them into stone, we use algorithms to carve out new understandings of the past.</p>
        
        <a href="/" class="btn back-btn">← Back to home</a>
    </main>
</div>

<style>
    .about-page {
        min-height: 100vh;
        background-color: #fcfbf8;
        padding-top: 120px;
        color: #3e2723;
        font-family: "Inter", sans-serif;
    }

    .top-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.5rem 4rem;
        background-color: #fcfbf8;
        border-bottom: 1px solid rgba(62, 39, 35, 0.1);
    }

    .nav-left .logo {
        font-family: "Inter", sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        letter-spacing: -0.04em;
        color: #3e2723;
        text-decoration: none;
    }

    .nav-right {
        display: flex;
        gap: 3rem;
        align-items: center;
    }

    .nav-right a {
        color: rgba(62, 39, 35, 0.6);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: color 0.3s ease;
    }

    .nav-right a:hover {
        color: #3e2723;
    }

    .content {
        max-width: 800px;
        margin: 0 auto;
        padding: 4rem 2rem;
    }

    h1 {
        font-family: "Instrument Serif", serif;
        font-size: 4rem;
        font-weight: 400;
        line-height: 1.1;
        margin-bottom: 3rem;
        letter-spacing: -0.01em;
    }

    h2 {
        font-family: "Instrument Serif", serif;
        font-size: 2.5rem;
        font-weight: 400;
        color: #3e2723;
        margin-top: 4rem;
        margin-bottom: 1.5rem;
    }

    p {
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.8;
        color: #5d4037;
        margin-bottom: 2rem;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        font-family: "Inter", sans-serif;
        font-size: 0.95rem;
        font-weight: 300;
        text-decoration: none;
        color: #3e2723;
        transition: all 0.3s ease;
        padding-bottom: 4px;
        border-bottom: 1px solid rgba(62, 39, 35, 0.3);
    }

    .btn:hover {
        border-bottom-color: #3e2723;
        opacity: 0.8;
        transform: translateY(-1px);
    }

    .back-btn {
        margin-top: 4rem;
    }
</style>
