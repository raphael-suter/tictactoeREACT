import puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  await page.goto('http://localhost:8080/');
});

describe('TicTacToe', () => {
  test('Should change border-color of TextField when form is submitted empty.', async () => {
    const dialog = await page.$('article');
    const button = await dialog.$('axa-button');

    const COLOR_VALID = 'rgb(153, 153, 153)';
    const COLOR_INVALID = 'rgb(201, 20, 50)';

    const borderColorOfTextField = async (index: number) => {
      return await page.evaluate((index: number) => {
        return getComputedStyle(
          document.querySelectorAll("[type='text']")[index]
        ).getPropertyValue('border-color')
      }, index);
    }

    expect(await borderColorOfTextField(0)).toBe(COLOR_VALID);
    expect(await borderColorOfTextField(1)).toBe(COLOR_VALID);

    await button.click();

    expect(await borderColorOfTextField(0)).toBe(COLOR_INVALID);
    expect(await borderColorOfTextField(1)).toBe(COLOR_INVALID);
  });

  test('Should display a message when someone wins.', async () => {
    await signIn();

    const main = await page.$('main');
    const div = await main.$('div');
    const fields = await div.$$('div');
    const dialog_Before = await page.$('article');

    await fields[0].click();
    await fields[1].click();
    await fields[3].click();
    await fields[4].click();
    await fields[6].click();

    const dialog_After = await page.$('article');
    const h1 = await dialog_After.$('axa-heading');
    const message = await h1.evaluate((element: any) => element.textContent);

    expect(dialog_Before).toBeFalsy();
    expect(dialog_After).toBeTruthy();
    expect(message).toBe('xxx hat gewonnen!');
  });

  test('Should display a message when there is no empty field left.', async () => {
    await signIn();

    const main = await page.$('main');
    const div = await main.$('div');
    const fields = await div.$$('div');
    const dialog_Before = await page.$('article');

    await fields[1].click();
    await fields[0].click();
    await fields[3].click();
    await fields[5].click();
    await fields[4].click();
    await fields[2].click();
    await fields[6].click();
    await fields[7].click();
    await fields[8].click();

    const dialog_After = await page.$('article');
    const h1 = await dialog_After.$('axa-heading');
    const message = await h1.evaluate((element: any) => element.textContent);

    expect(dialog_Before).toBeFalsy();
    expect(dialog_After).toBeTruthy();
    expect(message).toBe('Unentschieden!');
  });

  test('Should display score in correct format.', async () => {
    await signIn();

    const header = await page.$('header');
    const p = await header.$('p');
    const score = await p.evaluate((element: any) => element.textContent);

    expect(score).toBe('xxx 0:0 ooo');
  });

  test('Should switch between X an O.', async () => {
    await signIn();

    const main = await page.$('main');
    const div = await main.$('div');
    const fields = await div.$$('div');

    const textInField = async (index: number) => {
      return await fields[index].evaluate((element: any) => {
        return element.textContent
      });
    }

    await fields[0].click();
    await fields[1].click();
    await fields[2].click();

    expect(await textInField(0)).toBe('X');
    expect(await textInField(1)).toBe('O');
    expect(await textInField(2)).toBe('X');
  });
});

const signIn = async () => {
  const userDialog = await page.$('article');
  const textFields = await userDialog.$$('input');
  const button = await userDialog.$('axa-button');

  await textFields[0].type('xxx');
  await textFields[1].type('ooo');
  await button.click();
}

afterEach(async () => {
  await browser.close();
});
