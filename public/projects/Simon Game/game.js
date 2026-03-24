var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$(document).keypress(function(){
  if(!started){
    nextSequence();
    $("h1").text("level "+ level);
    started = true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Right");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }
  else{
    console.log("Wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      var audio3 = new Audio("sounds/wrong.mp3");
      audio3.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
  }
}

function startOver(){
  $("h1").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
