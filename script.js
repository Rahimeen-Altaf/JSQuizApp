const questions = [
 {
    question: "Which of the following is not a valid JavaScript variable name?",
    answers: [
        {text: "2java", correct: true},
        {text: "_java_and_ java _names", correct: false},
        {text: "javaandjava", correct: false},
        {text: "None of the above", correct: false},
    ]
  },
  {
    question: "Java Script supports all boolean operators.",
    answers: [
        {text: "True", correct: false},
        {text: "False", correct: true},
    ]
  },
  {
    question: "What language defines the behavior of a web page?",
    answers: [
        {text: "HTML", correct: false},
        {text: "CSS", correct: false},
        {text: "XML", correct: false},
        {text: "JavaScript", correct: true},
    ]
  },
  {
    question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answers: [
        {text: "Gives a warning", correct: false},
        {text: "Throws an error", correct: false},
        {text: "ignores the statement", correct: true},
        {text: "None of the above", correct: false},
    ]
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    answers: [
        {text: "getElementById()", correct: false},
        {text: "getElementByClassName()", correct: false},
        {text: "Both A and B", correct: true},
        {text: "None Of The Above", correct: false},
    ]
  },
  {
    question: "Is it possible to declare a variable in Java Script along its type?",
    answers: [
        {text: "Yes", correct: true},
        {text: "No", correct: false},
    ]
  },
  {
    question: "What is the alternate name for Java script?",
    answers: [
        {text: "LimeScript", correct: false},
        {text: "ECMScript", correct: false},
        {text: "ECMAScript", correct: true},
        {text: "Both a and d", correct: false},
    ]
  },
  {
    question: "JavaScript ignores extra spaces.",
    answers: [
        {text: "False", correct: false},
        {text: "True", correct: true},
    ]
  },
  {
    question: "Which of the below is used in Java script to insert special characters?",
    answers: [
        {text: "&", correct: false},
        {text: "/", correct: true},
        {text: "-", correct: false},
        {text: "%", correct: false},
    ]
  },
  {
    question: "Javascript is an object oriented language?",
    answers: [
        {text: "False", correct: false},
        {text: "True", correct: true},
    ]
  },
  {
    question: "To insert a JavaScript into an HTML page, which tag is used?",
    answers: [
        {text: "< script=â€™javaâ€™ >", correct: false},
        {text: "< javascript >", correct: false},
        {text: "< script >", correct: true},
        {text: "< js >", correct: false},
    ]
  },
  {
    question: "Which of the following is correct about JavaScript?",
    answers: [
        {text: "JavaScript is an Object-Based language", correct: true},
        {text: "JavaScript is Assembly-language", correct: false},
        {text: "JavaScript is an Object-Oriented language", correct: false},
        {text: "JavaScript is a High-level language", correct: false},
    ]
  }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    }) 
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length)  {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();