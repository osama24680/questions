import { quiz } from "./myQuiz.js"
export class MySettings {
    constructor() {

        this.categoryElement = document.getElementById("category")
        this.amountOfQuestions = document.getElementById("numOfQuestions")
        this.difficultyElement = document.getElementsByName("difficulty")
        this.startBtn = document.getElementById("startBtn")
        this.startBtn.addEventListener("click", () => { this.startQuiz() })
    }
    async startQuiz() {

        let category = this.categoryElement.value
        this.amount = this.amountOfQuestions.value
        let difficulty = Array.from(this.difficultyElement).filter((el) => { return el.checked })[0].value
        let questions = await this.fetch(`https://opentdb.com/api.php?amount=${this.amount}&category=${category}&difficulty=${difficulty}`)
        if (questions.length > 0) {
            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500)
            })
            new quiz(questions)

        }
    }
    async fetch(url) {
        let result = await fetch(url)
        let resultData = await result.json()
        console.log(resultData)
        return resultData.results
    }

}

























