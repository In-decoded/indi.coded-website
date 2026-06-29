const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        
        await page.goto('http://localhost:5174/delimitation', {waitUntil: 'networkidle0'});
        
        console.log('Page loaded');
        
        // Wait for the map to render
        await page.waitForSelector('path.state-boundary');
        
        console.log('Map rendered, hovering over first state...');
        
        const state = await page.$('path.state-boundary');
        await state.hover();
        
        await new Promise(r => setTimeout(r, 1000));
        
        const tooltipHtml = await page.$eval('.tooltip', el => el.outerHTML).catch(() => 'Tooltip not found');
        console.log('Tooltip HTML:', tooltipHtml);
        
        const tooltipStyle = await page.$eval('.tooltip', el => el.getAttribute('style')).catch(() => 'Tooltip not found');
        console.log('Tooltip Style:', tooltipStyle);
        
        await browser.close();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
