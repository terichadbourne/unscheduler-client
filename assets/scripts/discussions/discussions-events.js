'use strict'

//const getFormFields = require('../../../lib/get-form-fields')
const discussionsUi = require('./discussions-ui')
const discussionsApi = require('./discussions-api')

// event handlers for...
const addHandlers = function () {
  // auth-related buttons
  $('.list-discussions').on('click', onGetDiscussions)
}

// refresh discussion list
const onGetDiscussions = function (event) {
  console.log('in onGetDiscussions')
  // prevent page refresh
  // event.preventDefault()
  // send request to server
  discussionsApi.getDiscussions()
    .then(discussionsUi.getDiscussionsSuccess)
    .catch(discussionsUi.getDiscussionsError)
}

module.exports = {
  addHandlers: addHandlers,
  onGetDiscussions: onGetDiscussions
}
