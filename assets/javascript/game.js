 //////////////////////////////////////////////////////////////////////////////
 // word-guess/assets/javascript/game.js
 // JavaScript Keyword Guess game
 //
 // 1912 Wednesday, 27 February 2019 (EST) [17954]
 //
 // University of Richmond Coding Boot Camp run by Trilogy Education Services
 // Austin Kim
 //
 // Modified:
 //   1007 Saturday, 2 March 2019 (EST) [17957]
 //   0143 Sunday, 3 March 2019 (EST) [17958]
 //   1856 Monday, 4 March 2019 (EST) [17959]
 //   2109 Tuesday, 5 March 2019 (EST) [17960]
 //////////////////////////////////////////////////////////////////////////////

 // GLOBAL VARIABLES AND OBJECTS

 // Player names
var player1, player2

 // Player scores
var score = {
  p1: 0,
  p2: 0}

 // Prompt state:  0 = Prompting for player 1's word (have neither word yet)
 //                1 = Prompting for player 2's word (have only player 1's w)
var promptState

 // Which player went first in the most recent game
 //   (0 = no one; 1 = player 1; 2 = player 2)
var whoWentFirst = 0

 // Game over status
var gameOver

 // GAME OBJECT
var game = {
  p1word: '',                            // Player 1's word
  p2word: '',                            // Player 2's word
  p1guessed: '',                         // Player 1's guessed word so far
  p2guessed: '',                         // Player 2's guessed word so far
  p1letters: [],                         // Player 1's letters guessed so far
  p2letters: [],                         // Player 1's letters guessed so far
  turn: 0,                               // Player turn (1 = pl. 1, 2 = pl. 2)
 // init():  Initialize game
  init() {
   // Reset guessed words
    this.p1guessed = '_'
    for (var i = 1; i !== this.p1word.length; ++i) this.p1guessed += '_'
    this.p2guessed = '_'
    for (var i = 1; i !== this.p2word.length; ++i) this.p2guessed += '_'
    this.updateGuessed()                 // Update guessed words on page
   // Reset letters guessed
    for (var i = 0; i !== 26; ++i) this.p1letters[i] = false
    for (var i = 0; i !== 26; ++i) this.p2letters[i] = false
    this.updateLetters()                 // Update letters guessed on page
   // Initialize player turn
     // If this be the first game, toss a coin
    if (whoWentFirst === 0) this.turn = Math.floor(2 * Math.random()) + 1
     // Otherwise, alternate
      else this.turn = 3 - whoWentFirst
    whoWentFirst = this.turn
   // Update player turn on page
    this.updateTurn()
   // Start a new game
    gameOver = false
    return},
 // updateGuessed():  Update guessed words on page
  updateGuessed() {
   // Update player 1's guessed word
    var guessedWord = this.p1guessed[0]
    for (var i = 1; i !== this.p1word.length; ++i)
      guessedWord += ' ' + this.p1guessed[i]
    var element = document.getElementById('p1word')
    element.textContent = guessedWord
   // Update player 2's guessed word
    guessedWord = this.p2guessed[0]
    for (var i = 1; i !== this.p2word.length; ++i)
      guessedWord += ' ' + this.p2guessed[i]
    element = document.getElementById('p2word')
    element.textContent = guessedWord
    return},
 // updateLetters():  Update letters guessed on page
  updateLetters() {
   // Update player 1's letters guessed
    var gotOne = false
    var letters = '('
    for (var i = 0; i !== 26; ++i) if (this.p1letters[i])
      if (gotOne) letters += ' ' + String.fromCharCode(65 + i)
        else {
          letters += String.fromCharCode(65 + i)
          gotOne = true}
    letters += ')'
    var element = document.getElementById('p1letters')
    element.textContent = letters
   // Update player 2's letters guessed
    gotOne = false
    letters = '('
    for (var i = 0; i !== 26; ++i) if (this.p2letters[i])
      if (gotOne) letters += ' ' + String.fromCharCode(65 + i)
        else {
          letters += String.fromCharCode(65 + i)
          gotOne = true}
    letters += ')'
    var element = document.getElementById('p2letters')
    element.textContent = letters
    return},
 // updateTurn():  Update player turn on page
  updateTurn() {
   // Update player 1 turn field
    var element = document.getElementById('p1turn')
    if (this.turn === 1) element.textContent = 'Your turn'
      else element.textContent = ''
   // Update player 2 turn field
    element = document.getElementById('p2turn')
    if (this.turn === 1) element.textContent = ''
      else element.textContent = 'Your turn'
    return}
  }

 // GLOBAL FUNCTIONS

 // Global resetAll() function (called at beginning and when button is pressed)
function resetAll() {
   // Set player 1 name
  var playername = document.getElementById('player1name')
  var player = document.getElementById('player1')
  if (playername.value  === '') player1 = 'Player 1'
    else player1 = playername.value
  player.textContent = player1
   // Set player 2 name
  playername = document.getElementById('player2name')
  player = document.getElementById('player2')
  if (playername.value === '') player2 = 'Player 2'
    else player2 = playername.value
  player.textContent = player2
   // Reset scores
  score.p2 = score.p1 = 0
  var scorediv = document.getElementById('p1score')
  scorediv.textContent = score.p1
  scorediv = document.getElementById('p2score')
  scorediv.textContent = score.p2
   // Clear Player 1's new word field
  var wordElement = document.getElementById('p1newWord')
  wordElement.value = ''
   // Get Player 1's word for Player 2
  var wordPromptElement = document.getElementById('p1wordPrompt')
  wordPromptElement.textContent = player1 + ', please enter your word for ' +
    player2 + ' (' + player2 + ", please don't look:)"
  promptState = 0
  $('#p1wordModal').modal('show')
  return}

 // Global updateScore() function to update players' scores on page
function updateScore() {
  var element = document.getElementById('p1score')
  element.textContent = score.p1.toString()
  element = document.getElementById('p2score')
  element.textContent = score.p2.toString()
  return}

 // MODAL CALLBACK FUNCTIONS

 // If _Reset All_ be clicked, stop any currently playing game
var element = document.getElementById('resetAll')
element.onclick = function() {
  gameOver = true
  return}

 // Likewise, if _New Game_ be clicked, stop any currently playing game
element = document.getElementById('newGame')
element.onclick = function() {
  gameOver= true
  return}

 // These two callback functions are called when a user clicks on either _OK_
 //   or _Cancel_ (but not _Close_) in the player-name-setting reset modal,
 //   either of which will start the game
$('#resetModalOK').click(function() {
  resetAll()}
  )
$('#resetModalCancel').click(function() {
  resetAll()}
  )

 // Autofocus on player name input field
$('#resetModal').on('shown.bs.modal', function() {
  $('#player1name').trigger('focus')}
  )

 // This function is called when a user clicks on _OK_ in the player-1-word-
 //   prompting modal
$('#p1wordModalOK').click(function() {
  var wordElement = document.getElementById('p1newWord')
   // Word variable (for validation)
  var word
  word = wordElement.value
 // Does the word have at least one character?
  var wordValid = word.length >= 1
 // Is every character a letter?
  if (wordValid) {
    word = word.toUpperCase()
    for (var i = 0; i !== word.length; ++i)
      wordValid = wordValid && word[i] >= 'A' && word[i] <= 'Z'}
  if (wordValid) {
    game.p2word = word
   // Clear Player 2's new word field
  var wordElement = document.getElementById('p2newWord')
  wordElement.value = ''
   // Get Player 2's word for Player 1
    var wordPromptElement = document.getElementById('p2wordPrompt')
    wordPromptElement.textContent = player2 + ', please enter your word for ' +
      player1 + ' (' + player1 + ", please don't look:)"
    promptState = 1
    $('#p2wordModal').modal('show')}
    else $('#invalidWordModal').modal('show')}
  )

 // Autofocus on player 1 word input field
$('#p1wordModal').on('shown.bs.modal', function() {
  $('#p1newWord').trigger('focus')}
  )

 // This function is called when a user clicks on _OK_ in the player-2-word-
 //   prompting modal
$('#p2wordModalOK').click(function() {
  var wordElement = document.getElementById('p2newWord')
   // Word variable (for validation)
  var word
  word = wordElement.value
 // Does the word have at least one character?
  var wordValid = word.length >= 1
 // Is every character a letter?
  if (wordValid) {
    word = word.toUpperCase()
    for (var i = 0; i !== word.length; ++i)
      wordValid = wordValid && word[i] >= 'A' && word[i] <= 'Z'}
  if (wordValid) {
    game.p1word = word
   // Initialize game
    game.init()}
    else $('#invalidWordModal').modal('show')}
  )

 // Autofocus on player 2 word input field
$('#p2wordModal').on('shown.bs.modal', function() {
  $('#p2newWord').trigger('focus')}
  )

 // This function is called when a user clicks on _OK_ in the invalid word
 //   modal
$('#invalidWordModalOK').click(function() {
  switch (promptState) {
 // Prompt state:  0 = Prompting for player 1's word (have neither word yet)
    case 0:
      $('#p1wordModal').modal('show')
      break
 // Prompt state:  1 = Prompting for player 2's word (have only player 1's w)
    case 1:
      $('#p2wordModal').modal('show')}
    }
  )

 // This function is called when a user clicks on the _New Game_ button
$('#newGame').click(function() {
   // Clear Player 1's new word field
  var wordElement = document.getElementById('p1newWord')
  wordElement.value = ''
   // Get Player 1's word for Player 2
  var wordPromptElement = document.getElementById('p1wordPrompt')
  wordPromptElement.textContent = player1 + ', please enter your word for ' +
    player2 + ' (' + player2 + ", please don't look:)"
  promptState = 0
  $('#p1wordModal').modal('show')}
  )

 // This main event function is called when a user presses a key to guess
document.onkeyup = function(event) {
  var key = event.key.toUpperCase()
  var element                            // DOM element pointer
  var match = false                      // A letter matched
  var word                               // Temporary word variable
  if (!gameOver && key.length === 1 && key >= 'A' && key <= 'Z')
    switch(game.turn) {
    case 1:
      if (game.p1letters[key.charCodeAt(0) - 65]) {
        element = document.getElementById('letterGuessedPrompt')
        element.textContent = player1 +
          ', you have already guessed that letter.'
        $('#letterGuessedModal').modal('show')}
        else {
          game.p1letters[key.charCodeAt(0) - 65] = true
          game.updateLetters()
          word = ''
          for (var i = 0; i !== game.p1word.length; ++i)
            if (key === game.p1word[i]) {
              match = true
              word += key}
              else word += game.p1guessed[i]
          if (match) {
            game.p1guessed = word
            game.updateGuessed()
            if (game.p1guessed === game.p1word) {
              element = document.getElementById('p1turn')
              element.textContent = 'You win'
              element = document.getElementById('p2turn')
              element.textContent = ''
              gameOver = true
              ++score.p1
              updateScore()}
              else {
                game.turn = 3 - game.turn
                game.updateTurn()}
            }
            else {
              game.turn = 3 - game.turn
              game.updateTurn()}
          }
      break
    case 2:
      if (game.p2letters[key.charCodeAt(0) - 65]) {
        element = document.getElementById('letterGuessedPrompt')
        element.textContent = player2 +
          ', you have already guessed that letter.'
        $('#letterGuessedModal').modal('show')}
        else {
          game.p2letters[key.charCodeAt(0) - 65] = true
          game.updateLetters()
          word = ''
          for (var i = 0; i !== game.p2word.length; ++i)
            if (key === game.p2word[i]) {
              match = true
              word += key}
              else word += game.p2guessed[i]
          if (match) {
            game.p2guessed = word
            game.updateGuessed()
            if (game.p2guessed === game.p2word) {
              element = document.getElementById('p1turn')
              element.textContent = ''
              element = document.getElementById('p2turn')
              element.textContent = 'You win'
              gameOver = true
              ++score.p2
              updateScore()}
              else {
                game.turn = 3 - game.turn
                game.updateTurn()}
            }
            else {
              game.turn = 3 - game.turn
              game.updateTurn()}
          }
    }
  }

 // Show reset modal to start it all
$('#resetModal').modal('show')
