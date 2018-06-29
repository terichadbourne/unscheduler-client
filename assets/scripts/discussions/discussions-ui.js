'use strict'
// require dependencies
const ui = require('../ui')
const showDiscussionsTemplate = require('../templates/discussions-listing.handlebars')
// const store = require('../store')

const getDiscussionsSuccess = function (response) {
  // if you were redirected to getDiscussionsSuccess from createDiscussion,
  // hide the open modal you used to submit the proposal
  $('#proposeTopicModal').modal('hide')
  // if you were redirected to getDiscussionsSuccess from deleteDiscussion,
  // hide the open modal you used to delete the proposal
  $('#updateTopicModal').modal('hide')
  // clear values from proposal form
  $('#propose-topic-form > input').val('')
  console.log('response.discussions from getDiscussionSuccess is: ', response.discussions)
  console.log(`data from getDiscussionsSuccess is ${response}`)
  if (response.discussions.length === 0) {
    $('.discussion-list').html('No sessions to display. Have a topic to propose?')
  } else {
    const showDiscussionsHtml = showDiscussionsTemplate({ discussions: response.discussions })
    $('.discussion-list').html(showDiscussionsHtml)
  }
}

const getDiscussionsError = function (error) {
  console.log('in getDiscussionsError')
  ui.showMessage('Error retrieving all sessions from database.')
}

const createDiscussionError = function (error) {
  console.log('in createDiscussionError')
  ui.showMessage('Error creating new discussion topic in database.')
  // clear values from proposal form
  $('#propose-topic-form > input').val('')
}

const deleteDiscussionSuccess = function(response) {
  console.log('in deleteDiscussionSuccess')
}
const deleteDiscussionError = function (error) {
  console.log('in deleteDiscussionError')
  ui.showMessage('Error deleting session from database.')
}

module.exports = {
  getDiscussionsSuccess: getDiscussionsSuccess,
  getDiscussionsError: getDiscussionsError,
  createDiscussionError: createDiscussionError,
  deleteDiscussionSuccess: deleteDiscussionSuccess,
  deleteDiscussionError: deleteDiscussionError
}
