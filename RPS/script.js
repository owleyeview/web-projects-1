const score = {
  user: 0,
  computer: 0,
};

// Listening for the "Play" button click to start the game
document.querySelector(".start-button").addEventListener("click", function () {
  document.querySelector(".start-button").innerText = "Play Hand";
  playGame();
})
//document.querySelector(".start-button").removeEventListener("click", function (){});

// Main function to start the game
function playGame() {
  // Get all elements with the class "choice"
  let images = document.querySelectorAll(".choice");
  console.log(images);
  let userChoice = null;

  function handleClick(event) {
    userChoice = event.target.id;
    // Change target.id class from active-choice to user-choice
    event.target.classList.remove("active-choice");
    event.target.classList.add("user-choice");
  }

  // Add event listener to each image
  images.forEach((img) => {
    img.addEventListener("click", handleClick);
    img.classList.add("active-choice");
  });

  const choices = ["rock", "paper", "scissors"];
  // Generating a random index for the computer choice
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIndex];

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
          if (!userChoice) {
            images.forEach((img) => {
              img.removeEventListener("click", handleClick);
              img.classList.remove("active-choice");
            });
          } else {
            // Indicate the computer choice
            document
              .getElementById(computerChoice)
              .classList.add("computer-choice");
            setTimeout(() => {
              determineWinner(userChoice, computerChoice);
            }, 1000);
          }
        }, 2000);
      }, 1500);
    }, 1500);
  }, 1500);
}

// function to determine the winner and display the result
function determineWinner(userChoice, computerChoice) {
  if (userChoice == computerChoice) {
    document.querySelector(".game-display").innerText = "It's a draw!";
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
  } out of ${score.computer + score.user}`;
  setTimeout(() => {
    document.querySelector(".game-display").innerText = "Play again?";
    document.querySelector(".start-button").innerText = "Play Again";
  }, 2000);
}
