var randomNumber1 = 0;
var randomNumber2 = 0;



var randomNumber1 = Math.floor(Math.random() * 6) + 1;          //Generates a random number between 1 to 6
var randomDiceImage = "images/dice" + randomNumber1 + ".png";
var image1 = document.querySelectorAll("img")[0];              //for targeting img elements
image1.setAttribute("src", randomDiceImage);                  //replaces the source of img in html file

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage2 = "images/dice" + randomNumber2 + ".png";
var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randomDiceImage2);

if(randomNumber1>randomNumber2){
  document.querySelector("h1").innerHTML="PLAYER 1 WINS!"
}
else if(randomNumber1 === randomNumber2){
  document.querySelector("h1").innerHTML="DRAW!"
}
else{
  document.querySelector("h1").innerHTML="PLAYER 2 WINS!"
}
