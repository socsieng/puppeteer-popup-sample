const puppeteer = require('puppeteer');

async function executeGooglePay(url) {
  const browser = await puppeteer.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url);

    await page.click('.gpay-button');

    await page.waitFor(3000);

    const gpayPage = await getGooglePayPage(browser);

    await gpayPage.type('#identifierId', 'abcdefg');
    await gpayPage.click('#identifierNext');

    await page.waitFor(3000);
  } finally {
    await browser.close();
  }
}

async function getGooglePayPage(browser) {
  const popupUrlPrefix = 'https://accounts.google.com/signin/v2/';
  const gpayPage = (await browser.pages()).find(p => p.url().startsWith(popupUrlPrefix));

  return gpayPage;
}

executeGooglePay('https://react-gpay-button.firebaseapp.com/');
