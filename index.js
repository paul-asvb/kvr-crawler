const puppeteer = require('puppeteer');
const url = 'https://www.muenchen.de/rathaus/terminvereinbarung_fs.html'

async function findByElementByText(page, linkString) {
    const returnLinks = []
    const links = await page.$$('h3')
    for (var i = 0; i < links.length; i++) {
        let valueHandle = await links[i].getProperty('innerText');
        let linkText = await valueHandle.jsonValue();
        if (linkText = linkString) {
            returnLinks.push(links[i])
        }
    }
    return returnLinks;
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulateMediaType('print')

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });


    const elements = await findByElementByText(page, "Auskünfte / Beratungen");
    console.log(elements.length)
    for (var i = 0; i < elements.length; i++) {
        await elements[0].click();
    }

    await page.evaluate(() => {
        toggle('Auskünfte_SPACE_/_SPACE_Beratungen');
    });

    await page.screenshot({ path: 'example.png', fullPage: true });

    browser.close();
})();

/*
// Boilerplate stuff
async function startBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return { browser, page };
}

async function closeBrowser(browser) {
    return browser.close();
}

// Normalizing the text
function getText(linkText) {
    linkText = linkText.replace(/\r\n|\r/g, "\n");
    linkText = linkText.replace(/\ +/g, " ");

    // Replace &nbsp; with a space
    var nbspPattern = new RegExp(String.fromCharCode(160), "g");
    return linkText.replace(nbspPattern, " ");
}

// find the link, by going over all links on the page
async function findByLink(page, linkString) {
    const links = await page.$$('a')
    for (var i = 0; i < links.length; i++) {
        let valueHandle = await links[i].getProperty('innerText');
        let linkText = await valueHandle.jsonValue();
        const text = getText(linkText);
        if (linkString == text) {
            console.log(linkString);
            console.log(text);
            console.log("Found");
            return links[i];
        }
    }
    return null;
}

async function playTest(url) {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });
    await page.goto(url);
    await findByLink(page, "Lets Check It Out");
    await page.screenshot({ path: 'screenshot.png' });
    await closeBrowser(browser);
}

(async () => {
    await playTest("https://www.muenchen.de/rathaus/terminvereinbarung_fs.html");
    process.exit(1);
})();*/