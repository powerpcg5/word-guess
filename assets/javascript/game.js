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
 //   0042 Saturday, 2 March 2019 (EST) [17957]
 //////////////////////////////////////////////////////////////////////////////

 // Global objects
var score = {
  p1: 0,
  p2: 0}
 // Which player went first in the most recent game
 //   (0 = no one; 1 = player 1; 2 = player 2)
var whoWentFirst

 // Global previous word (so user does not get the same word twice in a row)
var previousWord

 // Game over (Boolean variable)
var gameOver

 // Global resetAll() function (called at beginning and when button is pressed)
function resetAll() {
   // Set player 1 name
  var playername = document.getElementById('player1name')
  var player = document.getElementById('player1')
  if (playername.value === '') player.textContent = 'Player 1'
    else player.textContent = playername.value
   // Set player 2 name
  playername = document.getElementById('player2name')
  player = document.getElementById('player2')
  if (playername.value === '') player.textContent = 'Player 2'
    else player.textContent = playername.value
   // Reset scores
  score.p2 = score.p1 = 0
  var scorediv = document.getElementById('p1score')
  scorediv.textContent = score.p1
  scorediv = document.getElementById('p2score')
  scorediv.textContent = score.p2
   // Reset who went first
  whoWentFirst = 0
  }

 // Game object (constructor function to call to initiate a new game)
function GameObject() {
    // Start a new game
  gameOver = false
  this.guessedWord = ''                  // Keywoard as guessed by user so far
  this.lettersGuessed = []               // Letters guessed so far (A--Z)
  this.guessesRemaining = NumberOfGuesses
  this.runAgain = false                  // Whether to play another game
  for (var i = 0; i !== this.keyword.length; ++i) this.guessedWord += '_'
  for (var i = 0; i !== 26; ++i) this.lettersGuessed[i] = false
 /* turn definition and set code */
  }

 // Install event handlers
$('#resetModalOK').click(function() {
  $('#resetModal').modal('hide')
  resetAll()}
  )

 // Show reset modal to start
$('#resetModal').modal('show')

 /*
var game = new GameObject()

GAME:
  MAIN LOOP:
    Get key via onKey
    If key is in lettersGuessed, alert, and re-cycle through loop
    (Otherwise:)
    Add key to lettersGuessed
    set match = false
    for loop through keyword:
      if key is in keyword, replace underline in guessedWord, and match = true
    if match = true:
      then if guessedWord = keyword, then: {
        alert user has won
        increment score.player
        Start new GAME}
    (Otherwise match = false:)
      Decrement guessesRemaining
      If guessesRemaining === 0, then: {
        alert computer has won; display correct word
        increment score.computer
        Start new GAME}
      Re-cycle through loop

*/
