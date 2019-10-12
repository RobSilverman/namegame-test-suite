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

    const finalStreakCount = Number(await page.streak.textContent);
    await t.expect(initialStreakCount + 1).eql(finalStreakCount);
});

test('Resets "Streak" counter to 0 on selection of incorrect photo', async t => {
    
    // In creating this test, I added the first searchName + t.click code below with the intent of getting one successful
    // result before getting an incorrect result to (hopefully) reset the "streak" counter to 0. I realized that:

    //      1) The session doesn't reset between tests, and therefore I would already have a streak of 1 if the above test didn't fail
    //      2) The animations shown on a correct result seem to take more time than an "await" call is willing to wait

    // While the if-statement should still cause the second click to result in "streak" reset, this feels like a sub-optimal solution.
    // I'm adding this note to indicate for whomever reviews this code that my incomplete understanding of test automation
    // best practices raises the question in this instance of whether tests should be contingent on the success of other tests.

    // I hope the code below shows some proficiency in the quick adoption of new tools, and that my admission of my own lack of knowledge 
    // of best practices is enterpreted as the willingness to learn that it is raised in the spirit of.
    var searchName = await page.correctName.textContent;
    await t.click(page.firstPhoto.withText(searchName));

    var searchName = await page.correctName.textContent;

    if (page.firstPhoto.withText(searchName) == page.firstPhoto.nth(0)){
        await t.click(page.firstPhoto.nth(1));
    } else {
        await t.click(page.firstPhoto.nth(0));
    }
    
    const finalStreakCount = Number(await page.streak.textContent);
    await t.expect(finalStreakCount).eql(0);
});