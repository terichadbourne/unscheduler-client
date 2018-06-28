'use strict'

// require dependencies
const config = require('../config')
const store = require('../store')

// // make a call to the server to create a new discussion
// const createDiscussion = function (data) {
//   return $.ajax({
//     method: 'POST',
//     url: config.apiUrl + '/discussions',
//     data: data
//   })
// }
//
// // make a call to server to update a discussion
// const updateDiscussion = function (data) {
//   return $.ajax({
//     method: 'PATCH',
//     url: config.apiUrl + `/discussions/${data.id}`,
//     data: data,
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }
//
// // make a call to server to delete a discussion
// const deleteDiscussion = function (id) {
//   return $.ajax({
//     method: 'DELETE',
//     url: config.apiUrl + `/discussions/${id}`,
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }
//
// // make a call to server to get a specific discussion
// const getDiscussion = function (id) {
//   return $.ajax({
//     method: 'GET',
//     url: config.apiUrl + `/discussions/${id}`
//   })
// }

// make a call to server to get all discussions
const getDiscussions = function () {
  console.log('in getDiscussions')
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + `/discussions/`
  })
}

module.exports = {
  // deleteDiscussion: deleteDiscussion,
  // updateDiscussion: updateDiscussion,
  // createDiscussion: createDiscussion,
  // getDiscussion: getDiscussion,
  getDiscussions: getDiscussions
}