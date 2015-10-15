$(document).ready(function(){

  var secretNum,
  userFeedback,
  userInput,
  counter,
  guessTracker;

  //create dom elements
  var $newGame = $("a.new");
  var $userGuess = $('#userGuess');
  var $feedback = $('#feedback');  
  var $form = $('form');
  var $span = $('span#count');
  var $guessList = $('#guessList');

  /*--- Display information modal box ---*/
  $(".what").click(function(){
    $(".overlay").fadeIn(1000);
  });

  /*--- Hide information modal box ---*/
  $("a.close").click(function(){
    $(".overlay").fadeOut(1000);
  });

	$newGame.click(newGame);

  function newGame(){
    // generates a new number when the user clicks 'new game'
    secretNum = randomNumber();
    // resets the counter back to 0
    counter = 0;
    // resets the guess tracker to empty
    guessTracker = "";
    // Adds insturctions back to Feedback section
    $feedback.html('Make your Guess!');
    // Sets the guess count back to 0
    $span.text('0');
    console.log("this is the secret number: " + secretNum);
  }

  //provides user feedback when 'Guess' button is clicked
  $form.submit(getUserInformation);

  function getUserInformation(e){    
    if(e){
      e.preventDefault();
    }    
    // gets the users guess
    getUserGuess();  
    // makes sure the input is valid 
    validInput();  
    // sets the user feedback variable to whatever is returned by the generateUserFeedback function
    userFeedback = generateUserFeedback();
    // add li elements to show what user has guesses so far
    generateGuessList();
    // increments the count of the user guess
    guessCount();  
    // shows the user a message about their guess
    renderUserInformation();  
  }

  // chooses secret number between 1 and 100 for each new game that user has to try to guess
  function randomNumber(){
    return Math.floor(Math.random()*100) + 1;
  }

  //clears users input each time they make a guess
  function clearUserInput(){
    $userGuess.val('');
    $userGuess.focus();     
  }

  //get users guess
  function getUserGuess(){
    userInput = parseInt($userGuess.val());  
    clearUserInput();
  }

  // makes sure the users input is valid -- NEED TO ADD REGEX FOR ANY CHARACTERS BESIDES NUMBERS
  function validInput(){
    if(isNaN(userInput)){
      alert("Please enter a number from 1 to 100. No letters accepted.");
      clearUserInput();
    }  
    if(userInput < 0 || userInput > 100){
      alert("Please enter a number from 1 to 100.");
      clearUserInput();
    }   
  }

  // returns a message to display to the user which is set to userFeedback variable
  function generateUserFeedback(){
    if(userInput === secretNum){
      return "You won! Click 'New Game' to play again.";                        
    } else if(Math.abs(secretNum - userInput) < 10){
      return "Very hot";           
    } else if(Math.abs(secretNum - userInput) < 20 && Math.abs(secretNum - userInput) > 9){
      return "Hot";          
    } else if(Math.abs(secretNum - userInput) < 30 && Math.abs(secretNum - userInput) > 19){
      return "Warm";          
    } else if(Math.abs(secretNum - userInput) < 50 && Math.abs(secretNum - userInput) > 29){
      return "Cold";           
    } else {
      return "Ice Cold";                               
    }
  }

  // shows the user a message about their guess
  function renderUserInformation(){
    $feedback.html(userFeedback);
    $guessList.append(guessTracker);
  }

  // increments the users guess count
  var guessCount = (function(){
    return function(){
      counter++
      $span.text(counter);      
    };
  })();

  var generateGuessList = (function(){
    return function(){
      guessTracker += '<li>' + userInput + '</li>'
    }
  })();

});
