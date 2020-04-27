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

  test('Should display a message when someone wins.', async (done) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:8080/');

    const textFields = await page.$$("[class='sc-fzozJi jeCHOk']");
    const submitButton = await page.$("[class='sc-AxheI gSORjP']");
    const fields = await page.$$("[class='sc-AxhCb dRAKpJ']");

    await textFields[0].type('u');
    await textFields[1].type('o');
    await submitButton.click();

    const dialog_Before = await page.$$("[class='sc-AxgMl joaQzC']");

    await fields[0].click();
    await fields[1].click();
    await fields[3].click();
    await fields[4].click();
    await fields[6].click();

    const dialog_After = await page.$$("[class='sc-AxgMl joaQzC']");

    expect(dialog_Before.length).toBe(0);
    expect(dialog_After.length).toBe(1);

    browser.close();
    done();
  });

  test('Should display a message when there is no empty field left.', async (done) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:8080/');

    const textFields = await page.$$("[class='sc-fzozJi jeCHOk']");
    const submitButton = await page.$("[class='sc-AxheI gSORjP']");
    const fields = await page.$$("[class='sc-AxhCb dRAKpJ']");

    await textFields[0].type('u');
    await textFields[1].type('o');
    await submitButton.click();

    const dialog_Before = await page.$$("[class='sc-AxgMl joaQzC']");

    await fields[1].click();
    await fields[0].click();
    await fields[3].click();
    await fields[5].click();
    await fields[4].click();
    await fields[2].click();
    await fields[6].click();
    await fields[7].click();
    await fields[8].click();

    const dialog_After = await page.$$("[class='sc-AxgMl joaQzC']");
    const message = await (await page.$("[class='sc-fzoLsD drscNc']")).evaluate(element => element.textContent);

    expect(dialog_Before.length).toBe(0);
    expect(dialog_After.length).toBe(1);
    expect(message).toBe('Unentschieden!');

    browser.close();
    done();
  });
});
