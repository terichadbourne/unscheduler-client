'use strict'
// require dependencies
const ui = require('../ui')

const createVoteError = function (error) {
  console.log('in createVoteError')
  ui.showMessage('Error creating new vote in database.')
}

const deleteVoteError = function (error) {
  console.log('in deleteVoteError')
  ui.showMessage('Error deleting vote from database.')
}

const pickWinnersError = function (error) {
  console.log('in pickWinnerError')
  ui.showMessage('Error retreiving votes from database to pick winners.')
}

module.exports = {
  createVoteError: createVoteError,
  deleteVoteError: deleteVoteError,
  pickWinnersError: pickWinnersError
}
