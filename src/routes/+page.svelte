<script>
    import { onMount } from "svelte";
    import { cubicOut, cubicIn } from "svelte/easing";

    const headlineTexts = [
        "India.decoded",
        "भारत.डिकोडेड",
        "இந்தியா.டிகோடெட்",
        "ভারত.ডিকোডেড",
        "భారత.డికోడెడ్",
        "ಭಾರತ.ಡಿಕೋಡೆಡ್",
        "ഇന്ത്യ.ഡീകോഡഡ്",
        "ભારત.ડિકોડેડ",
        "ਭਾਰਤ.ਡਿਕੋਡਿਡ",
    ];

    let currentLogoIndex = $state(0);

    onMount(() => {
        const interval = setInterval(() => {
            currentLogoIndex = (currentLogoIndex + 1) % headlineTexts.length;
        }, 2500); // Change every 2.5 seconds

        return () => clearInterval(interval);
    });

    /**
     * @param {Element} node
     * @param {any} params
     */
    function pushToBg(node, { delay = 0, duration = 1000, easing = cubicIn }) {
        return {
            delay,
            duration,
            easing,
            /** @param {number} t */
            css: (t) => `
                transform: scale(${0.8 + 0.2 * t});
                opacity: ${t};
                filter: blur(${(1 - t) * 15}px);
            `,
        };
    }

    /**
     * @param {Element} node
     * @param {any} params
     */
    function popFromFg(
        node,
        { delay = 0, duration = 1000, easing = cubicOut },
    ) {
        return {
            delay,
            duration,
            easing,
            /** @param {number} t */
            css: (t) => `
                transform: scale(${1.2 - 0.2 * t});
                opacity: ${t};
                filter: blur(${(1 - t) * 15}px);
            `,
        };
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
    />
    <title>indi.coded | A computational sketchbook of India</title>
</svelte:head>

<div class="hero-container">
    <nav class="top-nav">
        <div class="nav-left">
            <span>indi.coded</span>
        </div>
        <div class="nav-right">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
    </nav>

    <main class="hero-content">
        <div class="content-wrapper">
            <h1 class="headline">
                {#key currentLogoIndex}
                    <span
                        class="headline-word"
                        in:popFromFg={{ duration: 1200 }}
                        out:pushToBg={{ duration: 1200 }}
                    >
                        {headlineTexts[currentLogoIndex]}
                    </span>
                {/key}
            </h1>
            <p class="supporting-text">
                Exploring culture, memory, and systems through code and visual
                storytelling.
            </p>
            <div class="cta-area">
                <a href="#stories" class="btn">Explore Stories →</a>
            </div>
        </div>
    </main>
</div>

<section class="about-section">
    <div class="about-card">
        <div class="about-label">The Project</div>
        <div class="about-content">
            <h2>
                A computational sketchbook exploring India's visual and cultural
                memory.
            </h2>
            <p>
                In.decoded is an ongoing archive of experiments treating culture as a system to decode patterns, narratives, and historical artifacts.
            </p>
            <a href="/about" class="btn about-btn">Read the full manifesto →</a>
        </div>
    </div>
</section>

<section class="experiments-section" id="stories">
    <div class="section-header">
        <h2>Stories</h2>
        <a href="/stories" class="view-all">View All →</a>
    </div>

    <div class="experiments-grid">
        <!-- Item 1: Delimitation Project -->
        <a href="/delimitation" class="experiment-card">
            <div class="card-image" style="background-image: url('/delimitation_card.png');"></div>
            <div class="card-meta">
                <span class="tag">Data Story</span>
                <span class="year">2026</span>
            </div>
            <h3>The Delimitation Dilemma</h3>
            <p>
                An interactive exploration of India's shifting parliamentary
                representation and demographic power.
            </p>
        </a>
    </div>
</section>

<section class="cta-section">
    <div class="cta-card">
        <h2>Have an idea?</h2>
        <p>We are always looking for new stories, data sets, and computational experiments to decode India's history and culture.</p>
        <a href="/submit" class="btn submit-btn">Submit a Proposal →</a>
    </div>
</section>

<footer class="site-footer">
    <div class="footer-left">indi.coded &copy; 2026</div>
    <div class="footer-right">
        <a href="/contact">Contact</a>
        <a href="/archive">Archive</a>
        <a href="https://twitter.com">Twitter / X</a>
    </div>
</footer>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Inter", sans-serif;
        background-color: #fcfbf8; /* Elegant cream color */
        color: #1a1a1a; /* Dark text for contrast against cream */
    }

    .hero-container {
        /* User's provided background image */
        background-image: url("/hero-bg.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
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

    .nav-left {
        display: flex;
        align-items: center;
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

    .hero-content {
        position: relative;
        z-index: 2;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
    }

    .content-wrapper {
        max-width: 500px;
        text-align: center;
        padding: 0;
        margin-top: 2rem; /* Slight offset if needed to align perfectly in the arch */
    }

    .headline {
        display: grid;
        align-items: center;
        justify-content: center;
        font-family: "Instrument Serif", serif;
        font-size: 5rem;
        font-weight: 400;
        line-height: 1.05;
        color: #3e2723; /* Deep, rich earthy brown */
        margin: 0 0 1.5rem 0;
        letter-spacing: -0.01em;
    }

    .headline-word {
        grid-area: 1 / 1;
        white-space: nowrap;
    }

    .supporting-text {
        font-family: "Inter", sans-serif;
        font-size: 1.125rem;
        font-weight: 300;
        line-height: 1.6;
        color: #5d4037; /* Slightly softer brown for body text */
        margin: 0 auto 3rem auto;
        max-width: 400px;
    }

    .cta-area {
        display: flex;
        justify-content: center;
        gap: 2.5rem;
        margin-top: 1.5rem;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        font-family: "Inter", sans-serif;
        font-size: 0.95rem;
        font-weight: 300;
        text-decoration: none;
        color: #3e2723; /* Deep brown */
        transition: all 0.3s ease;
        padding-bottom: 4px;
        border-bottom: 1px solid rgba(62, 39, 35, 0.3);
    }

    .btn:hover {
        border-bottom-color: #3e2723;
        opacity: 0.8;
        transform: translateY(-1px);
    }

    .about-btn {
        margin-top: 1.5rem;
    }

    /* --- ABOUT SECTION --- */
    .about-section {
        padding: 6rem 4rem;
        background-color: #fcfbf8;
    }

    .about-card {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6rem;
        background-image: url("/about-bg.jpg");
        background-size: cover;
        background-position: center;
        border-radius: 24px;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        position: relative;
        overflow: hidden;
    }

    .about-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
        z-index: 1;
    }

    .about-label,
    .about-content {
        position: relative;
        z-index: 2;
    }

    .about-label {
        font-family: "Inter", sans-serif;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 2rem;
    }

    .about-content h2 {
        font-family: "Instrument Serif", serif;
        font-size: 4rem;
        font-weight: 400;
        line-height: 1.1;
        color: #ffffff;
        margin: 0 0 1.5rem 0;
        letter-spacing: -0.01em;
        max-width: 800px;
    }

    .about-content p {
        font-family: "Inter", sans-serif;
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        max-width: 600px;
    }

    .about-btn {
        margin-top: 2rem;
        color: #ffffff;
        border-bottom-color: rgba(255, 255, 255, 0.4);
    }

    .about-btn:hover {
        border-bottom-color: #ffffff;
    }

    /* --- EXPERIMENTS SECTION --- */
    .experiments-section {
        padding: 8rem 4rem;
        background-color: #fcfbf8;
    }

    .section-header {
        max-width: 1200px;
        margin: 0 auto 4rem auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .section-header h2 {
        font-family: "Instrument Serif", serif;
        font-size: 3rem;
        font-weight: 400;
        color: #3e2723;
        margin: 0;
    }

    .view-all {
        font-family: "Inter", sans-serif;
        font-size: 0.95rem;
        color: #5d4037;
        text-decoration: none;
        border-bottom: 1px solid rgba(93, 64, 55, 0.3);
        padding-bottom: 2px;
        transition: all 0.3s ease;
    }

    .view-all:hover {
        color: #3e2723;
        border-bottom-color: #3e2723;
    }

    .experiments-grid {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
    }

    .experiment-card {
        display: block;
        text-decoration: none;
        color: inherit;
        transition: transform 0.3s ease;
    }

    .experiment-card:hover {
        transform: translateY(-5px);
    }

    .card-image {
        width: 100%;
        aspect-ratio: 1408 / 1024;
        background-color: #f0ede6;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 1.5rem;
        border-radius: 4px;
        transition: filter 0.3s ease;
    }

    .experiment-card:hover .card-image {
        filter: brightness(0.95);
    }

    .card-meta {
        display: flex;
        justify-content: space-between;
        font-family: "Inter", sans-serif;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(62, 39, 35, 0.5);
        margin-bottom: 0.75rem;
    }

    .experiment-card h3 {
        font-family: "Instrument Serif", serif;
        font-size: 2rem;
        font-weight: 400;
        color: #3e2723;
        margin: 0 0 0.5rem 0;
    }

    .experiment-card p {
        font-family: "Inter", sans-serif;
        font-size: 0.95rem;
        font-weight: 300;
        line-height: 1.5;
        color: #5d4037;
        margin: 0;
    }

    /* --- CTA SECTION --- */
    .cta-section {
        padding: 4rem 4rem 8rem 4rem;
        background-color: #fcfbf8;
        display: flex;
        justify-content: center;
    }

    .cta-card {
        text-align: center;
        max-width: 600px;
        padding: 4rem;
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    .cta-card::before {
        content: "";
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background-image: url("/cta-bg.jpg");
        background-size: cover;
        background-position: center;
        filter: blur(2px) brightness(0.5);
        z-index: -1;
    }

    .cta-card h2 {
        font-family: "Instrument Serif", serif;
        font-size: 3rem;
        font-weight: 400;
        color: #ffffff;
        margin: 0 0 1rem 0;
    }

    .cta-card p {
        font-family: "Inter", sans-serif;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        margin: 0 0 2rem 0;
    }

    .submit-btn {
        font-size: 1.1rem;
        padding-bottom: 6px;
        color: #ffffff;
        border-bottom-color: rgba(255, 255, 255, 0.4);
    }

    .submit-btn:hover {
        border-bottom-color: #ffffff;
    }

    /* --- FOOTER --- */
    .site-footer {
        padding: 3rem 4rem;
        background-color: #fcfbf8;
        border-top: 1px solid rgba(62, 39, 35, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "Inter", sans-serif;
        font-size: 0.85rem;
        color: rgba(62, 39, 35, 0.6);
    }

    .footer-right {
        display: flex;
        gap: 2rem;
    }

    .footer-right a {
        color: rgba(62, 39, 35, 0.6);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-right a:hover {
        color: #3e2723;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .headline {
            font-size: 3.5rem;
        }

        .top-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 2rem;
        }

        .hero-content {
            padding: 0 2rem;
        }

        .content-wrapper {
            padding: 2rem;
        }

        .cta-area {
            flex-direction: column;
        }

        .about-card {
            padding: 3rem;
            border-radius: 16px;
        }

        .about-content h2 {
            font-size: 2.5rem;
        }

        .experiments-grid {
            grid-template-columns: 1fr;
        }

        .about-section,
        .experiments-section,
        .site-footer {
            padding: 4rem 2rem;
        }

        .site-footer {
            flex-direction: column;
            gap: 1.5rem;
        }
    }
</style>
