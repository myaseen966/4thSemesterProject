let questions = [
    {
        question : "What does CSS stand for",
        Options : [
            "Cascading style sheet",
            "Colorful style sheet",
            "Creative style sheet",
            "Computer style sheet"
        ],
        answer : "Cascading style sheet"
    },

    {
        question : "Which property is used to change the background color?",
        Options : [
            "color",
            "background-color",
            "bgcolor",
            "background"
        ],
        answer : "background-color"
    },

    {
        question : "How do you center a block element horizentally?",
        Options : [
            "text-align: center;",
            "margin: 0 auto;",
            "display: flex;",
            "padding: 0 auto;"
        ],
        answer : "margin: 0 auto;"
    },

    {
        question : "Which of the following CSS property controls the text size?",
        Options : [
            "font-style",
            "text-size",
            "font-size",
            "text-style"
        ],
        answer : "font-size"
    },

    {
        question : "How do you make each word in a text start with a capital letter?",
        Options : [
            "text-transform: capitalize;",
            "text-transform: uppercase;",
            "text-transform: lowercase;",
            "text-transform: none;"
        ],
        answer : "text-transform: capitalize;"
    }

];

let questionIndex = 0;
let questionArea = document.querySelector(".question h2");
let optionArea = document.querySelectorAll(".btn");

function initializeQuiz() {
    questionArea.textContent = questions[questionIndex].question;
    for (let i = 0 ; i < optionArea.length ; i++){
        optionArea[i].textContent = questions[questionIndex].Options[i];
    }
}


let marks = 0;
for (let i = 0; i < optionArea.length; i++) {
    optionArea[i].addEventListener('click' , checkedOption)
}

var obj = this;
let correctSound = document.getElementById("correctSound");
let wrongSound = document.getElementById("wrongSound");
// console.log(obj)

function checkedOption() {
    let correctAnswer = questions[questionIndex].answer;
    let selectedAnswer = this.textContent;

    if(correctAnswer === selectedAnswer) {
        marks++;
        this.style.backgroundColor = 'green';
        this.style.color = 'white';
        this.textContent += '✔';
        // correctSound.play();
    }

    else {
        this.style.backgroundColor = 'red';
        this.style.color = 'white';
        this.textContent += '❌';
        // wrongSound.play();
        for (let i = 0; i < optionArea.length; i++) {
            if (optionArea[i].textContent === questions[questionIndex].answer) {
                optionArea[i].style.backgroundColor = 'green';
                optionArea[i].style.color = 'white';
                optionArea[i].textContent += '✔';
            }
        }
    }
    disableOptions();
    questionIndex++;
}

function disableOptions() {
    for (let i = 0; i < optionArea.length; i++) {
        optionArea[i].disabled = 'true';
    }
}

let quizGame = document.querySelector('.quiz-game');
let resultSection = document.querySelector('.resultSection');
let resultSectionTex = document.querySelector('.resultSection h1')

let nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click' , moveToNextQuestion);

function moveToNextQuestion() {
    for(let i = 0; i < optionArea.length; i++) {
        optionArea[i].disabled = false;
        optionArea[i].style.backgroundColor = '';
        optionArea[i].style.color = '';
    }
    if(questionIndex <= optionArea.length) {
        initializeQuiz();
    }

    else {
        alert('Quiz Completed')
        resultSection.style.display = 'block';
        quizGame.style.display = 'none';
        resultSectionTex.textContent = `Your marks are ${marks} / ${questions.length}`;
    }
}

let restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click' , restartQuiz);

function restartQuiz() {
    marks = 0;
    questionIndex = 0;
    resultSection.style.display = 'none';
    quizGame.style.display = 'block';
    initializeQuiz();
}

document.addEventListener('keydown' , handleKeyPress);
function handleKeyPress(event) {
    let keyPressed = event.key;
    let optionIndex = parseInt(keyPressed)-1;
    if(optionIndex >= 0 && optionIndex < optionArea.length) {
        optionArea[optionIndex].click();
    }
}

initializeQuiz();