export class quiz {
    constructor(questions) {
        this.question = questions
        this.total = questions.length
        this.nextbtn = document.getElementById("next")
        this.nextbtn.addEventListener("click", () => { this.nextQ() })
        this.tryBtn = document.getElementById("tryBtn")
        this.tryBtn.addEventListener("click", () => { this.tryAgain() })
        this.currentQuestion = 0
        this.score = 0;
        this.isCorrect = true;
        this.showQuestion()

    }


    showQuestion() {
        document.getElementById("question").innerHTML = this.question[this.currentQuestion].question
        document.getElementById("current").innerHTML = this.currentQuestion + 1
        document.getElementById("totalAmount").innerHTML = this.total
        this.showAnswers()
    }


    showAnswers() {
        this.answers = [this.question[this.currentQuestion].correct_answer,
        ...this.question[this.currentQuestion].incorrect_answers]
        console.log(this.answers)


        let currentIndex = this.answers.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.answers[currentIndex], this.answers[randomIndex]] = [
                this.answers[randomIndex], this.answers[currentIndex]];
        }



        console.log(this.answers)
        this.cartoona = ``
        for (let i = 0; i < this.answers.length; i++) {
            this.cartoona += `
            <div class="form-check">
            <input type="radio" class="form-check-input mb-3" id=${i} name="answer">
            ${this.answers[i]}
            </div>`
        }
        document.getElementById("rowAnswer").innerHTML = this.cartoona


    }


    nextQ() {
        this.checkAnswers();
        (this.isCorrect) ?
            $("#Correct").fadeIn(500, () => { $("#Correct").fadeOut(500) })
            : $("#inCorrect").fadeIn(500, () => { $("#inCorrect").fadeOut(500) })

        this.currentQuestion++;
        if (this.currentQuestion < this.total) {
            this.showQuestion()
        } else {
            this.finish()
        }
    }



    checkAnswers() {
        this.userAnswer = document.getElementsByName("answer")
        this.userAnswer = Array.from(this.userAnswer).filter((el) => { return el.checked })[0].value;
        this.correctAnswer = this.question[this.currentQuestion].correct_answer;
        console.log(this.correctAnswer)
        if (this.correctAnswer == this.userAnswer) {
            this.score++;
            this.isCorrect = true;
        } else {
            this.isCorrect = false
        }
        console.log(this.userAnswer)
    }

    finish() {
        $("#quiz").fadeOut(500, () => {
            $("#finish").fadeIn(500)
        })
        document.getElementById("score").innerHTML = this.score

    }

    tryAgain() {
        $("#finish").fadeOut(500, () => {
            $("#setting").fadeIn(500)
        })
    }
}