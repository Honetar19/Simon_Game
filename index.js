var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  CheckAnswer(userClickedPattern.length - 1);
});

function playSound(rcc) {
  switch (rcc) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      break;
  }
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function CheckAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var worng = new Audio("sounds/wrong.mp3");
    worng.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = false;
}
