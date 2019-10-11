import { BasePage } from "../pages/BasePage";

const page = new BasePage();

fixture`Home`.page(page.baseUrl);

test('Correct title displays', async t => {
    await t
        .expect(page.title.textContent)
        .eql("name game")
});

test('Attempts counter increments after selecting a photo', async t => {
    const initialAttemptsCount = Number(await page.attempts.textContent);
    
    await t.click(page.firstPhoto);

    const finalAttemptsCount = Number(await page.attempts.textContent);

    await t
    .expect(finalAttemptsCount)
    .eql(initialAttemptsCount + 1);
});

test('Increments "Streak" counter on selection of correct photo', async t => {
    const initialStreakCount = Number(await page.streak.textContent);
    const searchName = await page.correctName.textContent;
    
    await t.click(page.firstPhoto.withText(searchName));

    const finalStreakCount =Number(await page.streak.textContent);
    await t.expect(initialStreakCount + 1).eql(finalStreakCount);
});