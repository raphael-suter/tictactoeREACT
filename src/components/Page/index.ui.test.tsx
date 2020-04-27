import puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  await page.goto('http://localhost:8080/');
});

describe('TicTacToe', () => {
  test('Should change TextField appearance when form is submitted empty.', async () => {
    const textFieldsValid_Before = await page.$$("[class='sc-fzozJi jeCHOk']");
    const textFieldsInValid_Before = await page.$$("[class='sc-fzozJi kwaWSs']");

    await page.click("[class='sc-AxheI gSORjP']");

    const textFieldsValid_After = await page.$$("[class='sc-fzozJi jeCHOk']");
    const textFieldsInValid_After = await page.$$("[class='sc-fzozJi kwaWSs']");

    expect(textFieldsValid_Before.length).toBe(2);
    expect(textFieldsInValid_Before.length).toBe(0);
    expect(textFieldsValid_After.length).toBe(0);
    expect(textFieldsInValid_After.length).toBe(2);
  });

  test('Should display a message when someone wins.', async () => {
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
  });

  test('Should display a message when there is no empty field left.', async () => {
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
    const message = await (await page.$("[class='sc-fzoLsD drscNc']")).evaluate((element: any) => element.textContent);

    expect(dialog_Before.length).toBe(0);
    expect(dialog_After.length).toBe(1);
    expect(message).toBe('Unentschieden!');
  });

  test('Should display score in correct format.', async () => {
    const textFields = await page.$$("[class='sc-fzozJi jeCHOk']");
    const submitButton = await page.$("[class='sc-AxheI gSORjP']");

    await textFields[0].type('xxx');
    await textFields[1].type('ooo');
    await submitButton.click();

    const message = await (await page.$("[class='sc-fznyAO iyklt']")).evaluate((element: any) => element.textContent);
    expect(message).toBe('xxx 0:0 ooo');
  });

  test('Should switch between X an O.', async () => {
    const textFields = await page.$$("[class='sc-fzozJi jeCHOk']");
    const submitButton = await page.$("[class='sc-AxheI gSORjP']");
    const fields = await page.$$("[class='sc-AxhCb dRAKpJ']");

    await textFields[0].type('u');
    await textFields[1].type('o');
    await submitButton.click();

    await fields[0].click();
    await fields[1].click();
    await fields[2].click();

    expect(await fields[0].evaluate((element: any) => element.textContent)).toBe('X');
    expect(await fields[1].evaluate((element: any) => element.textContent)).toBe('O');
    expect(await fields[2].evaluate((element: any) => element.textContent)).toBe('X');
  });
});

afterEach(async () => {
  await browser.close();
});
