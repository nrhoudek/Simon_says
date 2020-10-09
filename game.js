var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

//Time delays in ms
var fadeInDelay = 100;
var fadeOutDelay = 100;
var pressedDelay  = 100;
var backgroundRemovalDelay = 200;
var sequenceDelay = 500;
var nextSequenceDelay = 1000;


//starting the game w/ keyboard
$(document).keydown(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }//end if
});

$(".btn").click(function () {
  //starting the game with mouse/touch or continuing game if already started.
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
  else {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); //pass last index of array
  }//end if
});

//prevent highlighting of buttons on mouse double click.
$("body").mousedown(function (event) {
  event.preventDefault();
});


function nextSequence() {
  level++;
  $("#level-title").html("Level " + level); //update level when passed
  var randomNumber = Math.floor(Math.random() * 4); //generate random number between 0 and 3
  var randomChosenColor = buttonColors[randomNumber];

//play previous pattern sequence for user when level is higher than 1.
  if (level > 1) {
    var index = 0; //reset index to 0 so it can comb through gamePattern Array.
    playPreviousSequence(index);
  }//end if

  gamePattern.push(randomChosenColor); //add next color into gamePattern array

  //make sure the next button in the sequence does not animate until the entire previous sequence of buttons has animated through playPreviousSequence()
  setTimeout (function () {
    $("#" + randomChosenColor).fadeIn(fadeInDelay).fadeOut(fadeOutDelay).fadeIn(fadeInDelay); //button animation when the button is selected to be added to the gamePattern array
    playSound(randomChosenColor);
  }, level * sequenceDelay);
}//end nextSequence()

function playPreviousSequence(index) {
  //play the previous sequence of buttons for the user with a delay of 500ms for each button.
  setTimeout (function () {
    $("#" + gamePattern[index]).fadeIn(fadeInDelay).fadeOut(fadeOutDelay).fadeIn(fadeInDelay); //button animation when the button is selected to be added to the gamePattern array
    playSound(gamePattern[index]);

    //if the incremented index is less than the length of the gamePattern array then call playPreviousSequence() again.
    if (++index < gamePattern.length - 1) {
      playPreviousSequence(index);
    }//end if
  }, sequenceDelay);

}//end playPreviousSequence()


function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play(); //play related button sound
}//end playSound()


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //button css class pressed to button

 //remove css class pressed after 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, pressedDelay);
}//end animatePress()


function checkAnswer(currentLevel) {
  //check to make sure what user selected matches what the game chose. If not, game over. If so, move on to next selection
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    gameOver();
  }//end if
  else {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, nextSequenceDelay);
      userClickedPattern = []; //reset array for next level verification
    }//end inner if
  }//end outer if
}//end checkAnswer


function gameOver() {
  $("#level-title").html("Game Over, Press Any Button to Restart");

  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();

  $("body").addClass("game-over"); //make html body background red

  setTimeout(function() {
    $("body").removeClass("game-over"); //remove red background
  }, backgroundRemovalDelay);

  //reset all variables
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
}//end gameOver()
