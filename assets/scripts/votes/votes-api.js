'use strict'

// require dependencies
const config = require('../config')
const store = require('../store')

// make a call to the server to create a vote
const createVote = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/votes',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// make a call to server to delete a vote
const deleteVote = function (id) {
  console.log('in deleteVote trying to delete id: ', id)
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + `/votes/${id}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  deleteVote: deleteVote,
  createVote: createVote
}
