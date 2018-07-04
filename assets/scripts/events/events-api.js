'use strict'

// require dependencies
const config = require('../config')
const store = require('../store')

// make a call to server to update event admin details
const updateEvent = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + `/discussions/${data.discussion.id}`,
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// make a call to server to get a specific event
const getEvent = function (id) {
  if (store.user) {
    return $.ajax({
      method: 'GET',
      url: config.apiUrl + `/events/${id}`,
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  } else {
    return $.ajax({
      method: 'GET',
      url: config.apiUrl + `/events/${id}`
    })
  }
}

module.exports = {
  updateEvent: updateEvent,
  getEvent: getEvent
}
