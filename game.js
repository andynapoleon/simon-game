
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound (color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress (currentColour) {
  $('#'+currentColour).addClass("pressed");
  setTimeout(function () {
    $('#'+currentColour).removeClass("pressed");
  },100)
}

function nextSequence () {
  var randomNumber = Math.floor(Math.random()*3 + 1);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level ++;
  $("#level-title").text("Level " + level);
  console.log(gamePattern);
}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if (userClickedPattern.length === gamePattern.length) {
    console.log("sequence finished");
    setTimeout(function () {
      nextSequence();
      userClickedPattern = [];
    },1000);
  }
}

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

$(document).keypress(function(){
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});
