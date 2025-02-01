const words = require('./words');

const gameWeb = {
  loginPage: function () {
    return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="style.css">
        <title>Home Page</title>
      </head>
      <body>
        <div class="container">
            <div class="title">
            <h1>Welcome!Let's start the Game!</h1>
            </div>
            <div class="login-form">
              <form action="/login" method="POST">
              <img class="profile-picture" alt="default image" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg">
                <label for="username">Username:</label>
                <input class="username" id="username" name="username" placeholder="Enter Username">
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
      </body>
    </html>
    `
  },


  homePage: function(username, userData) {
    const guessWidget = !userData.guessCorrect ? gameWeb.guessWidget() : '';
    const successMessage = userData.guessCorrect ? '<p class="success">You have guessed the right word! Congratulations!!</p>' : '';

    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Home Page</title>
        </head>
        <body>
          <div class="main-area">
            ${gameWeb.dataForm(username, userData)}    
            ${guessWidget}
            ${successMessage}   
            <div class="button-widget">
             <form action="/new-game" method="POST">
              <button type="submit">Start a new game</button>
            </form>  
            </div>
            <div class="button-widget">
            <form action="/logout" method="POST">
              <button type="submit">Logout</button>
            </form>          
          </div>                                   
          </div>  
        </body>
      </html>
    `;
  },


  dataForm: function (username, userData) {
    const length = userData.guessedWords.length
    const lastGuess = (length == 0) ? '' : (userData.guessedWords[length - 1] + ': ' + userData.matchedLetterCount[length - 1])
    const wordsList = words.filter(word => !userData.guessedWords.includes(word)).join(' ');
    const guessedWords = userData.guessedWords.map((word, index) => `${word}: ${userData.matchedLetterCount[index]}`).join(', ');
    let lastGuessInfo = '';
    if (lastGuess !== '') {
        lastGuessInfo = `In your #${length} turn, word '${userData.guessedWords[length - 1]}' matches ${userData.matchedLetterCount[length - 1]} letters.`;
    } else {
        lastGuessInfo = 'No guesses have been made yet.';
    }

    return `
      <div class="data-page">
       <div class="title">
          <h1>Welcome ${username}!</h1>
       </div>
       <span class="header">List of words to guess:</span>
       <p class="valid-words">${wordsList}</p>
       <p><span class="header">Total Guesses:</span>${guessedWords}</p>
       <p><span class="header">Number of times you guessed: </span>${length}</p>
       <p><span class="header">Last Guess: </span>${lastGuess}</p>
       <h2 class="statement">${lastGuessInfo}</h2>
      </div>     
    `
  },


  guessWidget: function () {
    return `
      <div class="guess button-widget">
        <form action="/guess" method="POST">
          <label for="word">Enter a word:</label>
          <input class="guess-word" id="word" name="word"/>
          <button type="submit">Guess</button>
        </form>          
      </div>      
    `
  },


  invalidLoginForm: function (errors) {
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Errors</title>
        </head>
        <body>
          <div class="container">
            <div class="login-failed">
            <img alt="default login fail image" src="https://st.depositphotos.com/1006899/2650/i/450/depositphotos_26505551-stock-photo-error-metaphor.jpg">
             <p>${errors}</p>
              <p><a href="/">Click here to go back.</a></p>
            </div>
          </div>
        </body>
    </html>
    `
  },

}

module.exports = gameWeb;