const words = require('./words');

const sessions = {};
const userData = {};

function userNameValid (username) {
    const regex = /^[a-zA-Z0-9]+$/;
    if (!username || !username.match(regex) || username === 'dog') {
      return false;
    }
    return true;
  };

  function checkWordValid (words, username) {
    words = words.toLowerCase();
    const guessedWords = userData[username].guessedWords;
    if (!words || words.length != 5 || !words.includes(words) || guessedWords.includes(words)) {
      return false;
    }
    return true;
  };

  function randomWord (words) {
    const idx = Math.floor(Math.random() * words.length);
    return words[idx];
  }

function resetUserData (username) {
  userData[username] = {
    guessedWords: [],
    matchedLetterCount: [],
    secretWord: randomWord(words),
    guessCorrect: false,
  };

  console.log('Logged in User Name: ' + username);
  console.log('Secret Word is: ' + userData[username].secretWord);
}


function checkWord (word, username) {
  word = word.toLowerCase();
  const secretWord = userData[username].secretWord;
  const wordList = word.split("");
  let count = 0;
  let matchedCount = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === secretWord[i]) {
      matchedCount += 1;
    }

    const index = wordList.indexOf(secretWord[i]);
    if (index != -1) {
      count++;
      wordList[index] = "*";
    }
  }

  userData[username].guessedWords.push(word)
  userData[username].matchedLetterCount.push(count)

  if (matchedCount === 5) {
    userData[username].guessCorrect = true
  }

};



const game = {
  sessions,
  userData,
  resetUserData,
  randomWord,
  userNameValid,
  checkWordValid,
  checkWord
};

module.exports = game;