const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const questionImage = document.getElementById("questionImage");

const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");

const nextButton = document.getElementById("nextButton");
const timer = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let unanswered = 0;
let answered = false;
let timeLeft = 60;
let timerInterval;


// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    const q = window.questions[currentQuestion];

    if (!q) {
        console.log("Question not found");
        return;
    }

    questionNumber.textContent = currentQuestion + 1;

    questionText.textContent = q.Question;

    // وێنەکە لە هەمان فۆڵدەری پڕۆژە
    questionImage.src = q.Image;

    answerA.querySelector("span").textContent = q.AnswerA;
    answerB.querySelector("span").textContent = q.AnswerB;
    answerC.querySelector("span").textContent = q.AnswerC;


    // پاککردنەوەی ڕەنگی پرسیاری پێشوو

    answerA.classList.remove("correct", "wrong");
    answerB.classList.remove("correct", "wrong");
    answerC.classList.remove("correct", "wrong");


    // کردنەوەی وەڵامەکان

    answerA.disabled = false;
    answerB.disabled = false;
    answerC.disabled = false;


    answered = false;

    nextButton.style.display = "none";


    startTimer();
}



// ===============================
// TIMER
// ===============================

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 60;

    timer.textContent = timeLeft;


    timerInterval = setInterval(function () {

        timeLeft--;

        timer.textContent = timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timeOut();

        }

    }, 1000);
}



// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    clearInterval(timerInterval);


    const q = window.questions[currentQuestion];

    const correct = q.Correct.trim().toUpperCase();


    let selectedButton = null;


    if (selected === "A") {
        selectedButton = answerA;
    }

    if (selected === "B") {
        selectedButton = answerB;
    }

    if (selected === "C") {
        selectedButton = answerC;
    }


    // ===============================
    // وەڵامی ڕاست
    // ===============================

    if (selected === correct) {

        selectedButton.classList.add("correct");

        score++;

    }

    // ===============================
    // وەڵامی هەڵە
    // ===============================

    else {

        selectedButton.classList.add("wrong");


        if (correct === "A") {
            answerA.classList.add("correct");
        }

        if (correct === "B") {
            answerB.classList.add("correct");
        }

        if (correct === "C") {
            answerC.classList.add("correct");
        }

    }


    // داخستنی هەموو وەڵامەکان

    answerA.disabled = true;
    answerB.disabled = true;
    answerC.disabled = true;


    nextButton.style.display = "block";
}



// ===============================
// TIME OUT
// ===============================

function timeOut() {

    if (answered) return;

    answered = true;


    // ئەمە گرنگە:
    // پرسیارەکە بە وەڵام نەدراوە حیساب دەکرێت

    unanswered++;


    const q = window.questions[currentQuestion];

    const correct = q.Correct.trim().toUpperCase();


    // تەنها وەڵامی ڕاست نیشان بدە

    if (correct === "A") {
        answerA.classList.add("correct");
    }

    if (correct === "B") {
        answerB.classList.add("correct");
    }

    if (correct === "C") {
        answerC.classList.add("correct");
    }


    // داخستنی وەڵامەکان

    answerA.disabled = true;
    answerB.disabled = true;
    answerC.disabled = true;


    // پیشاندانی دوگمەی دواتر

    nextButton.style.display = "block";
}



// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    currentQuestion++;


    // ئەگەر پرسیارەکان تەواوبوون

    if (currentQuestion >= window.questions.length) {

        localStorage.setItem("quizScore", score);

        localStorage.setItem(
            "quizTotal",
            window.questions.length
        );

        localStorage.setItem(
            "quizUnanswered",
            unanswered
        );


        window.location.href = "result.html";

        return;
    }


    loadQuestion();
}



// ===============================
// ANSWER BUTTONS
// ===============================

answerA.addEventListener("click", function () {

    checkAnswer("A");

});


answerB.addEventListener("click", function () {

    checkAnswer("B");

});


answerC.addEventListener("click", function () {

    checkAnswer("C");

});



// ===============================
// NEXT BUTTON
// ===============================

nextButton.addEventListener("click", function () {

    nextQuestion();

});



// ===============================
// START
// ===============================

loadQuestion();