import { Selector } from "testcafe";

export class BasePage {

    baseUrl = 'http://www.ericrochester.com/name-game/';

    title = Selector(".header")
    firstPhoto = Selector(".photo")
    attempts = Selector(".attempts")
    correct = Selector(".correct")
    streak = Selector(".streak")
    correctName = Selector("#name")
    stats = Selector("#stats")

}