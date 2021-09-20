// The array of questions for the game.
var questions = [
    { q: "Commonly used data types DO Not Include:", 
        answers: ["1. strings", "2. booleans", "3. alerts","4. numbers"],
        correctAnswer: "3. alerts"
    },
    { q: "The condition in an if / else statement is enclosed with _____.", 
    answers: ["1. quotes","2. curly brackets","3. parenthesis","4. square brackets"],
    correctAnswer: "2. curly brackets"
    },
    { q: "Arrays in JavaScript can be used to store _____. ", 
        answers: ["1.numbers and strings","2. other arrays","3. booleans","4. all of the above"],
        correctAnswer: "4. all of the above"
    },
  
    { q: "String values must be enclosed within _____ when being assigned to variables", 
        answers: ["1. commas","2. curly brackets","3. quotes","4. parenthesis"],
        correctAnswer: "3. quotes"
    },
    { q: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        answers: ["1. JavaScript","2. terminal/bash","3. for loops","4. console.log"],
        correctAnswer: "4. console.log"
    }
  ];

// We start the game with a timer of 75 seconds
var questionAnswer = document.getElementById("question-list");
var clearPage = document.getElementById("question-box")
var result = document.getElementById("result")

//displaying next question
var questionNumber = 0;

var allScores = []
var scoresStorage = JSON.parse(localStorage.getItem("userData"));

//when we click the start quiz, the quiz starts

function startQuiz() {
    if(scoresStorage !==null) {
        allScores = scoresStorage;
    }
    var introduction = document.getElementById("intro");
    introduction.parentNode.removeChild(introduction);
    loadQuiz();
}

document.getElementById("start").addEventListener("click", startQuiz);

//loading list of quiz

function loadQuiz(question) {
    document.getElementById("display-question").textContent = questions[questionNumber].q;
    console.log(questionNumber);
    questions[questionNumber].answers.forEach(element => {
        var button = document.createElement("button")
        button.setAttribute("type", "button");
       button.innerText=element
       // questionanswers.innerHTML=""
       questionAnswer.appendChild(button)
       button.addEventListener("click", checkAnswer)
       });
    
  
    function checkAnswer (i) {
        console.log(i.target.innerText)
        if (i.target.innerText === questions[questionNumber].correctAnswer) {
            document.getElementById("result").innerHTML = "correct!";
            nextQuestion();
        }
        else if (i.target.textContent != questions[questionNumber].correctAnswer) {
            document.getElementById("result").innerHTML = "wrong!";
            timeLeft = timeLeft - 10;
            nextQuestion();
        }
    }
}

// reset page and goes to the next set of questions
function nextQuestion() {
    questionNumber++
    if (questionNumber < questions.length) {
        questionAnswer.innerHTML = "" 
       loadQuiz(questionNumber);
    }
    else {
        clearTimeout(countdownTimer);
        highscore();
    }
}



//show score as time remaining
var timeLeft = 75;
var timer = document.getElementById("timer");
var countdownTimer = setInterval(minusOneSecond, 1000)

function minusOneSecond () {
    if (timeLeft === 0) {
        clearInterval(countdownTimer);
        window.alert("You ran out of time!")
        questionAnswer.innerHTML = ""
    }
    else {
        timer.innerHTML = timeLeft + " seconds remaining";
        timeLeft--;
    }
}

//answer saved into highscore board
 

 function highscore () {

    var clearPage = document.getElementById("question-box")
    clearPage.parentNode.removeChild(clearPage)
    var clearAnswer = document.getElementById("result")
    clearAnswer.parentNode.removeChild(clearAnswer);
    createScoreBoard ();
 }

function createScoreBoard () {
    var playerName = document.createElement("input")
    playerName.setAttribute("type", "text")
    playerName.setAttribute("placeholder", "Enter your name here!")
    playerName.setAttribute("id", "player-name")
   
    var addScore = document.getElementById("add-score")
    addScore.appendChild(playerName);
    var submitButton = document.createElement("button")
    submitButton.setAttribute("type", "button");
    submitButton.textContent = "Submit!";
    addScore.appendChild(submitButton);
    submitButton.addEventListener("click", function(){
        var name = document.getElementById("player-name").value
        scoreboard(name, timeLeft)
    });
    var name = document.getElementById("player-name").value
    var playerNameInput = playerName.textContent
    console.log(name)
    localStorage.setItem("playerNameInputs", name);
    var scoresStorage = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));

}


function scoreboard (x,y) {
    var userData = {
        inits: x,
        userScore: y
    };
    allScores.push(userData);

    location.href = "highscore.html"
    localStorage.setItem("userData", JSON.stringify(allScores));
    
    
    // localStorage.getItem("timeLeft")
}

// function displayScores() {
//     if (scoresStorage !== null) {
//         var scoreList = document.createElement("ol");
//         scoreList.className = "scoreListClass";
//         for (var i = 0; i < scoresStorage.length; i++) {
//             var initials = scoresStorage[i].inits;
//             var scores = scoresStorage[i].userScore
//             var scoreEntry = document.createElement("li");
//             scoreEntry.innerHTML = initials + " - " + scores;
//             scoreList.appendChild(scoreEntry);
//         }
//         highScoresArea.appendChild(scoreList);
//     }
// };
// displayScores();



