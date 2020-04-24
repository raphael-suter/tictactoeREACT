import puppeteer from 'puppeteer';

describe('TicTacToe', () => {
  test('Should change TextField appearance when form is submitted empty.', async (done) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:8080/');

    const textFieldsValid_Before = await page.$$("[class='sc-fzozJi jeCHOk']");
    const textFieldsInValid_Before = await page.$$("[class='sc-fzozJi kwaWSs']");

    await page.click("[class='sc-AxheI gSORjP']");

    const textFieldsValid_After = await page.$$("[class='sc-fzozJi jeCHOk']");
    const textFieldsInValid_After = await page.$$("[class='sc-fzozJi kwaWSs']");

    expect(textFieldsValid_Before.length).toBe(2);
    expect(textFieldsInValid_Before.length).toBe(0);
    expect(textFieldsValid_After.length).toBe(0);
    expect(textFieldsInValid_After.length).toBe(2);

    browser.close();
    done();
  });
});
