<svelte:head>
    <title>Submit a Proposal | indi.coded</title>
</svelte:head>

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
            <h1>Submit a Proposal</h1>
            <p>Have an idea for a data story or computational experiment? We'd love to collaborate with you to decode India's history and culture.</p>
        </header>

        <section class="form-section">
            <form class="proposal-form" on:submit|preventDefault={() => alert("Thank you for your proposal! We will get back to you soon.")}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Jane Doe" />
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="jane@example.com" />
                </div>
                
                <div class="form-group">
                    <label for="title">Proposal Title</label>
                    <input type="text" id="title" name="title" required placeholder="e.g. Tracing the Silk Route via Trade Data" />
                </div>
                
                <div class="form-group">
                    <label for="description">Description & Concept</label>
                    <textarea id="description" name="description" rows="6" required placeholder="Tell us about your idea, the data sources you might use, and the narrative angle..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="portfolio">Link to Previous Work (Optional)</label>
                    <input type="url" id="portfolio" name="portfolio" placeholder="https://yourportfolio.com" />
                </div>

                <button type="submit" class="submit-btn">Send Proposal</button>
            </form>
        </section>
    </main>

    <footer class="site-footer">
        <div class="footer-left">indi.coded &copy; 2026</div>
        <div class="footer-right">
            <a href="/contact">Contact</a>
            <a href="/archive">Archive</a>
            <a href="https://twitter.com">Twitter / X</a>
        </div>
    </footer>
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
        margin-bottom: 4rem;
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

    .form-section {
        width: 100%;
        max-width: 600px;
        background: #ffffff;
        padding: 3rem;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(62, 39, 35, 0.05);
        border: 1px solid rgba(62, 39, 35, 0.05);
    }

    .form-group {
        margin-bottom: 2rem;
    }

    .form-group label {
        display: block;
        font-family: "Inter", sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        color: #3e2723;
        margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
        font-size: 1rem;
        padding: 1rem;
        background: #fcfbf8;
        border: 1px solid rgba(62, 39, 35, 0.15);
        border-radius: 8px;
        color: #1a1a1a;
        transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #3e2723;
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(62, 39, 35, 0.05);
    }

    .submit-btn {
        display: inline-block;
        width: 100%;
        padding: 1rem 2rem;
        background-color: #3e2723;
        color: #ffffff;
        font-family: "Inter", sans-serif;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .submit-btn:hover {
        background-color: #2b1a17;
        transform: translateY(-2px);
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

    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 3rem;
        }

        .main-content {
            padding: 8rem 1.5rem 4rem 1.5rem;
        }

        .form-section {
            padding: 2rem;
        }

        .top-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 2rem;
        }

        .site-footer {
            flex-direction: column;
            gap: 1.5rem;
            padding: 3rem 2rem;
        }
    }
</style>
