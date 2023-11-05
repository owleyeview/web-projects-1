const score = {
  user: 0,
  computer: 0,
  draw: 0,
};

// Listening for the "Play" button click to start the game
document.querySelector(".start-button").addEventListener("click", function () {
  document.querySelector(".start-button").innerText = "Play Hand";
  playGame();
});

// Main function to start the game
function playGame() {
  document
    .querySelector(".start-button")
    .removeEventListener("click", playGame); // playGame?

  let userChoice = null;

  function handleClick(event) {
    userChoice = event.currentTarget.id; // changed from target to currentTarget
    console.log(userChoice);
    // Change currentTarget.id class from active-choice to user-choice
    event.currentTarget.classList.remove("active-choice");
    event.currentTarget.classList.add("user-choice");
  }

  // Get all elements with the class "choice"
  let images = document.querySelectorAll(".choice");
  // Add event listener to each image
  images.forEach((img) => {
    img.addEventListener("click", handleClick);
    img.classList.add("active-choice");
  });

  const computerChoice = randomChoice();

  //countdown timer
  document.querySelector(".game-display").innerText = "Rock...";
  setTimeout(() => {
    document.querySelector(".game-display").innerText = "Rock, Paper...";
    setTimeout(() => {
      document.querySelector(".game-display").innerText =
        "Rock, Paper, Scissors...";
      setTimeout(() => {
        document.querySelector(".game-display").innerText = "Shoot!";
        setTimeout(() => {
          // Making a random choice if the user doesn't make a choice
          if (!userChoice) {
            userChoice = randomChoice();
            document.getElementById(userChoice).classList.add("user-choice");
          }
          // Indicate the computer choice
          document
            .getElementById(computerChoice)
            .classList.add("computer-choice");
          setTimeout(() => {
            determineWinner(userChoice, computerChoice);
          }, 1000);
        }, 2000);
      }, 1500);
    }, 1500);
  }, 1500);
}

// function to generate a random choice
function randomChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const choice = choices[randomIndex];
  return choice;
}

// function to determine the winner and display the result
function determineWinner(userChoice, computerChoice) {
  if (userChoice == computerChoice) {
    document.querySelector(".game-display").innerText = "It's a draw!"; // should this change the score?
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    document.querySelector(".game-display").innerText = `${
      userChoice.charAt(0).toUpperCase() + userChoice.slice(1)
    } beats ${
      computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    }. You win!`;
    score.user++;
  } else {
    document.querySelector(".game-display").innerText = `${
      computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    } beats ${
      userChoice.charAt(0).toUpperCase() + userChoice.slice(1)
    }. You lose!`;
    score.computer++;
  }
  document.querySelector(".score-text").innerText = `Score: ${
    score.user
  } out of ${score.computer + score.user + score.draw}`;
  setTimeout(() => {
    document.querySelector(".game-display").innerText = "Play again?";
    document.querySelector(".start-button").innerText = "Play Again";
    document
      .querySelector(".start-button")
      .addEventListener("click", function () {
        // Remove the computer and user choice classes to reset the colors
        document
          .getElementById(computerChoice)
          .classList.remove("computer-choice");
        document.getElementById(userChoice).classList.remove("user-choice");
        document.querySelector(".start-button").innerText = "Play Hand";
        playGame();
      });
  }, 2000);
}
