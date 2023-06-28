var startBtn = document.querySelector(".btn");
var timerEl = document.querySelector(".timer-count");
var questionEl = document.querySelector("#question");
var optionsEl = document.querySelector("#options");
var highScoreBtn = document.querySelector("#hi-scores");
var scoreboard = document.querySelector("#scoreboard");
var timerCount = "60";
var currentQuestion = 0;
var score = 0;

var questions = [
    {
        question: "Which of the following is NOT a primitive data type?",
        options: ["String", "Object", "Number", "Boolean"],
        correctAns: 1,
    },{
        question: "Which symbol is used to denote an ID when using query selector?",
        options: ["$", "&", "#", "@"],
        correctAns: 2,
    },{
        question: "Inside of which HTML element is JavaScript put in?",
        options: ["link", "java", "head", "script"],
        correctAns: 3,  
    },{
        question: "How do you call a function named 'exampleFunction?'",
        options: ["exampleFunction()", "callExampleFunction()", "call exampleFunction", "call()"],
        correctAns: 0,
    },{
        question: "What is the difference between '===' and '==?'",
        options: ["There is no difference", "'===' tests for equality of value, while '==' tests for equality of value and type", "'===' tests for equality of value and type, while '==' tests for equality of value", "'===' tests for equality, while '==' tests for inequality"],
        correctAns: 2,
    }
]

function renderQuestion() {
    questionEl.innerHTML = "";
    optionsEl.innerHTML = "";
    questionEl.innerHTML = questions[currentQuestion].question;
    questionEl.classList.add("questions");
    questions[currentQuestion].options.forEach((option, index) => {
        var optionEl = document.createElement("div");
        optionEl.innerHTML = option;
        optionEl.classList.add("options");
        optionEl.value = index;
        optionEl.addEventListener("click", optionClick);
        optionsEl.appendChild(optionEl);
    })
}

function optionClick(event) {
    var selectedOption = event.target;
    var selectedAns = parseInt(selectedOption.value);
    if (selectedAns === questions[currentQuestion].correctAns) {
        score += 20;
    } else {
        timerCount -= 10;
    }
    currentQuestion++
    if (currentQuestion === questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function startQuiz(event) {
   var timer = setInterval(function() {
    timerEl.innerText = timerCount + " seconds remaining."
    if (timerCount <= 0) {
        endQuiz();
    } else {
        timerCount--
    }
    }, 1000);
    renderQuestion();
}

function endQuiz(event) {
    var scoreEl = document.querySelector("#score");
    var quizEl = document.querySelector("#quiz")
    scoreEl.innerText = "Your score is " + score + "!";
    scoreEl.style.display = "block";
    timerEl.style.display = "none";
    quizEl.style.display = "none";
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var playerName = document.querySelector("#playerName").value;
    var playerScore = { name: playerName, score: score };
    highScores.push(playerScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    var scoreboard = document.querySelector("#scoreboard");
    scoreboard.classList.remove("form");
}

function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    var scoresList = document.querySelector("#scoresList");
    scoresList.innerHTML = "";
    var topScores = highScores.slice(0, 10);
    topScores.forEach(function (scoreObj) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = scoreObj.name + " - " + scoreObj.score;
        scoresList.appendChild(scoreItem);
    });
    var highScoresSection = document.querySelector("#highScoresSection");
    highScoresSection.style.display = "block";
}

startBtn.addEventListener("click", startQuiz);
scoreboard.addEventListener("submit", endQuiz);
highScoreBtn.addEventListener("click", displayHighScores)
scoreboard.classList.add("form");