const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
    
    updateScoreElement();

    //instead of using onclick for buttons use addEventListener
    document.querySelector('.js-rock-button').addEventListener('click',() => {
      playGame('rock');
    });
    document.querySelector('.js-paper-button').addEventListener('click',() => {
      playGame('paper');
    });
    document.querySelector('.js-scissors-button').addEventListener('click',() => {
      playGame('scissors');
    });
    document.querySelector('.js-reset-score-button').addEventListener('click',() => {
      localStorage.removeItem('score');
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      updateScoreElement();
    });
    document.querySelector('.js-auto-play-button').addEventListener('click',() => {
      autoPlay();
    });
    
    //if you press r, p, s anywhere on body it should play the game
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      }
    });

    let isAutoPlaying = false;
    let id;
    function autoPlay() {
      if(!isAutoPlaying){
       id = setInterval(function() {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
      } else {
        clearInterval(id);
        isAutoPlaying = false;
      }
      
    }

    function playGame(playerMove){
      const computerMove = pickComputerMove();
      let result = '';

      if(playerMove === 'scissors') {
        if (computerMove === 'scissors') {
          result = 'Tie.';
        } else if (computerMove === 'paper') {
          result = 'You Win.';
        }else{
          result = 'You Lose.';
        }

      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie.';
        } else if (computerMove === 'scissors') {
          result = 'You Win.';
        }else{
          result = 'You Lose.';
        }

      } else {
        if (computerMove === 'paper') {
          result = 'Tie.';
        } else if (computerMove === 'rock') {
          result = 'You Win.';
        }else{
          result = 'You Lose.';
        }
      }

      if (result === 'You Win.'){
        score.wins++;
      } else if (result === 'You Lose.') {
        score.losses++;
      } else {
        score.ties++;
      }

      //store the score object in local storage so that scores will be displayed even after refreshing the page. since localStorage only supports string, convert score JS object to JSON object as its type is string.
      localStorage.setItem('score',JSON.stringify(score));

      document.querySelector('.js-result')
        .innerHTML = `${result}`;
      document.querySelector('.js-moves')
        .innerHTML = ` You
        <img src="images/${playerMove}-emoji.png" alt="your move" class="move-icon">
        <img src="images/${computerMove}-emoji.png" alt="computer move" class="move-icon">
        Computer`;
      updateScoreElement();
      
    }

    function updateScoreElement() {
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }

    function pickComputerMove(){
      const randomNumber = Math.random();

      let computerMove = '';
      if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
      } else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove ='paper';
      }else{
        computerMove ='scissors';
      }

      return computerMove;
    }