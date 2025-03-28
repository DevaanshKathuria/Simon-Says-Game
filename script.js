const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let clickCount = 0;
let gameStarted = false;

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    level = 0;
    gamePattern = [];
    userPattern = [];
    clickCount = 0;
    document.getElementById("status").textContent = `Level ${level}`;
    document.getElementById("clickCount").textContent = clickCount;

    showMyTexts();
    nextSequence();
  }
}

function nextSequence() {
  userPattern = [];
  clickCount = 0;
  document.getElementById("clickCount").textContent = clickCount;
  level++;
  document.getElementById("status").textContent = `Level ${level}`;

  document.getElementById("sequenceDisplay").textContent = "-";

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);

  animateSequence();
}

function animateSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gamePattern[i]);
    i++;
    if (i === gamePattern.length) {
      clearInterval(interval);
      enableUserInput();
    }
  }, 600);
}

function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 300);
}

function enableUserInput() {
  colors.forEach((color) => {
    document.getElementById(color).addEventListener("click", handleUserClick);
  });
}

function disableUserInput() {
  colors.forEach((color) => {
    document
      .getElementById(color)
      .removeEventListener("click", handleUserClick);
  });
}

function handleUserClick(event) {
  const clickedColor = event.target.id;
  userPattern.push(clickedColor);
  flashButton(clickedColor);
  clickCount++;
  document.getElementById("clickCount").textContent = clickCount;

  const sequenceDisplay = document.getElementById("sequenceDisplay");
  sequenceDisplay.innerHTML = "";

  userPattern.forEach((color) => {
    const span = document.createElement("span");
    span.style.color = color; 
    span.textContent = color.toUpperCase() + " "; 
    sequenceDisplay.appendChild(span); 
  });

  checkAnswer(userPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      disableUserInput();
      setTimeout(() => {
        showCongratsMessage();
        setTimeout(() => {
          hideCongratsMessage();
          setTimeout(() => {}, 1000); 
          nextSequence();
        }, 2000); 
      }, 1000);
    }
  } else {
    document.getElementById("status").textContent = `Game Over!`;

    setTimeout(() => {
      flashButton(missedColor);
    }, 1000);
    setTimeout(() => {
      hideMyTexts();
    }, 1000);

    showLoseMessage();
    setTimeout(() => {
      hideLoseMessage();
    }, 2000);

    gameStarted = false;

    setTimeout(() => {
      level = 0;
      gamePattern = [];
      document.getElementById("sequenceDisplay").textContent = "-";
      document.getElementById("clickCount").textContent = 0;
    }, 1500);
  }
}

function showCongratsMessage() {
  const message = `Congrats! You passed level ${level}!`;
  const congratsMessageElement = document.getElementById("levelMessage");
  congratsMessageElement.textContent = message;
  congratsMessageElement.style.display = "block"; 
  setTimeout(() => {
    congratsMessageElement.classList.add("show"); 
  }, 50); 
}

function hideCongratsMessage() {
  const congratsMessageElement = document.getElementById("levelMessage");
  congratsMessageElement.classList.remove("show"); 
  setTimeout(() => {
    congratsMessageElement.style.display = "none"; 
  }, 1000); 
}

function showLoseMessage() {
  const message = `Game Over! Correct color was ${
    gamePattern[userPattern.length - 1]
  }.`;
  const loseMessageElement = document.getElementById("levelMessage");
  loseMessageElement.textContent = message;
  loseMessageElement.style.color = "red";
  loseMessageElement.style.display = "block"; 
  setTimeout(() => {
    loseMessageElement.classList.add("show"); 
  }, 50); 
}

function hideLoseMessage() {
  const loseMessageElement = document.getElementById("levelMessage");
  loseMessageElement.classList.remove("show"); 
  setTimeout(() => {
    loseMessageElement.style.display = "none"; 
  }, 1000); 
}

function showMyTexts() {
  const texts = document.getElementsByClassName("myText");

  for (let i = 0; i < texts.length; i++) {
    texts[i].style.display = "block";
    texts[i].classList.add("show");
  }
}

function hideMyTexts() {
  const texts = document.getElementsByClassName("myText");

  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("show");
    texts[i].style.display = "none";
  }
}
