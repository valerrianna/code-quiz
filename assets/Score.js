var scoresStorage = JSON.parse(localStorage.getItem("userData"));
var highScoresArea = document.querySelector("#highscore-list");

function displayScores() {
    if (scoresStorage !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "scoreListClass";
        for (var i = 0; i < scoresStorage.length; i++) {
            var initials = scoresStorage[i].inits;
            var scores = scoresStorage[i].userScore
            var scoreEntry = document.createElement("li");
            scoreEntry.innerHTML = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        highScoresArea.appendChild(scoreList);
    }
};
displayScores();