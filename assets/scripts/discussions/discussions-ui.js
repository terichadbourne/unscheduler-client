'use strict'
// require dependencies
const ui = require('../ui')
const showDiscussionsTemplate = require('../templates/discussions-listing.handlebars')
const showDiscussionsLoggedOutTemplate = require('../templates/discussions-listing-logged-out.handlebars')
const updateFormTemplate = require('../templates/update-topic-form.handlebars')
const store = require('../store')

const getDiscussionsSuccess = function (response) {
  store.discussions = response.discussions
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
  // if someone is logged in
  if (store.user) {
    if (response.discussions.length === 0) {
      $('.discussion-list').html('No sessions to display. Have a topic to propose?')
    } else {
      const showDiscussionsHtml = showDiscussionsTemplate({ discussions: response.discussions })
      $('.discussion-list').html(showDiscussionsHtml)
    }
    //if no one is logged in
  } else {
    if (response.discussions.length === 0) {
      $('.discussion-list').html('No sessions to display. Have a topic to propose? Log in!')
    } else {
      const showDiscussionsHtml = showDiscussionsLoggedOutTemplate({ discussions: response.discussions })
      $('.discussion-list').html(showDiscussionsHtml)
    }
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

const updateDiscussionError = function (error) {
  console.log('in updateDiscussionError')
  ui.showMessage('Error updating that discussion in database.')
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
  const updateFormHtml = updateFormTemplate({ discussion: response.discussion })
  $('#update-topic-form').html(updateFormHtml)
  $('button.remove, button.edit, #update-topic-form').data('id', id)
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
  updateDiscussionError: updateDiscussionError,
  refreshUpdateModal: refreshUpdateModal
}
