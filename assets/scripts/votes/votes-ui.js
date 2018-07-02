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

module.exports = {
  createVoteError: createVoteError,
  deleteVoteError: deleteVoteError
}
