var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

//starting the game
$(document).keydown(function () {
  if (gameStarted === false) {
    nextSequence();
    gameStarted = true;
  }//end if
});


$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern); //remove when finished.

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); //pass index of last array
});


function nextSequence() {
  level++;
  $("#level-title").html("Level " + level); //update level when passed
  var randomNumber = Math.floor(Math.random() * 4); //generate random number between 0 and 3
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); //add next color into gamePattern array

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //button animation when the button is selected to be added to the gamePattern array
  playSound(randomChosenColor);

}//end nextSequence()


function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play(); //play related button sound
}//end playSound()


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //button css class pressed to button

 //remove css class pressed after 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}//end animatePress()


function checkAnswer(currentLevel) {
  //check to make sure what user selected matches what the game chose. If not, game over. If so, move on to next selection
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    gameOver();
  }
  else {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = []; //reset array for next level verification
    }//end inner if
  }//end outer if
}//end checkAnswer


function gameOver() {
  $("#level-title").html("Game Over, Press Any Key to Restart");

  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();

  $("body").addClass("game-over"); //make html body background red

  setTimeout(function() {
    $("body").removeClass("game-over"); //remove red background
  }, 200);

  //reset all variables
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;

}//end gameOver()
