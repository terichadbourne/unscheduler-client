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

const getDiscussionError = function (error) {
  console.log('in getDiscussionError')
  ui.showMessage('Error retrieving that particular session from database.')
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

const deleteDiscussionError = function (error) {
  console.log('in deleteDiscussionError')
  ui.showMessage('Error deleting session from database.')
}

const refreshUpdateModal = function (response) {
  const id = response.discussion.id
  console.log('id is: ', id)
  $('#updateTopicModal, button.remove, button.edit, #update-topic-form').data('id', id)
  $('#updateTopicModal').modal('show')
  console.log("$('#updateTopicModal').data('id') is ", $('#updateTopicModal').data('id'))
  console.log("$('button.remove').data('id') is ", $('button.remove').data('id'))
  console.log("$('button.edit').data('id') is ", $('button.edit').data('id'))
  console.log("$('#update-topic-form').data('id') is ", $('#update-topic-form').data('id'))
}
module.exports = {
  getDiscussionsSuccess: getDiscussionsSuccess,
  getDiscussionsError: getDiscussionsError,
  getDiscussionError: getDiscussionError,
  createDiscussionError: createDiscussionError,
  deleteDiscussionError: deleteDiscussionError,
  refreshUpdateModal: refreshUpdateModal
}
