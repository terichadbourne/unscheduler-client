'use strict'
// require dependencies
const ui = require('../ui')
const showDiscussionsProposingTemplate = require('../templates/discussions-list-proposing.handlebars')
const showDiscussionsVotingTemplate = require('../templates/discussions-list-voting.handlebars')
const showDiscussionsLoggedOutTemplate = require('../templates/discussions-list-logged-out.handlebars')
const updateFormTemplate = require('../templates/update-topic-form.handlebars')
const store = require('../store')
const eventsEvents = require('../events/events-events')

const getDiscussionsSuccess = function (response) {
  store.discussions = response.discussions
  // fetch updated event record in case it's changed
  if (store.user) {
    eventsEvents.onGetEvent()
  }
  // if you were redirected to getDiscussionsSuccess from createDiscussion,
  // hide the open modal you used to submit the proposal
  $('#proposeTopicModal').modal('hide')
  // if you were redirected to getDiscussionsSuccess from deleteDiscussion,
  // hide the open modal you used to delete the proposal
  $('#updateTopicModal').modal('hide')
  // clear values from proposal form
  $('#propose-topic-form > input').val('')
  // if someone is logged in
  if (store.user) {
    const revisedDiscussions = response.discussions.map((discussion) => {
      if (store.event.max_votes) {
        discussion.can_upvote = discussion.current_user_total_votes < store.event.max_votes
      }
      return discussion
    })
    if (response.discussions.length === 0) {
      $('.discussion-list-message').html('No sessions to display. Have a topic to propose?')
    } else {
      const showDiscussionsVotingHtml = showDiscussionsVotingTemplate({ discussions: revisedDiscussions })
      const showDiscussionsProposingHtml = showDiscussionsProposingTemplate({ discussions: revisedDiscussions })
      $('.discussion-list-voting').html(showDiscussionsVotingHtml)
      $('.discussion-list-proposing').html(showDiscussionsProposingHtml)
    }
    // if no one is logged in
  } else {
    if (response.discussions.length === 0) {
      $('.discussion-list-logged-out').html('No sessions to display. Have a topic to propose? Log in!')
    } else {
      const showDiscussionsLoggedOutHtml = showDiscussionsLoggedOutTemplate({ discussions: response.discussions })
      $('.discussion-list-logged-out').html(showDiscussionsLoggedOutHtml)
    }
  }
  ui.showMessage('Discussion list is up to date.')
  setTimeout(ui.clearMessage, 2000)
}

const getDiscussionError = function (error) {
  ui.showMessage('Error retrieving that particular session from database.')
}

const getDiscussionsError = function (error) {
  ui.showMessage('Error retrieving all sessions from database.')
}

const updateDiscussionError = function (error) {
  ui.showMessage('Error updating that discussion in database.')
}

const createDiscussionError = function (error) {
  ui.showMessage('Error creating new discussion topic in database.')
  // clear values from proposal form
  $('#propose-topic-form > input').val('')
}

const deleteDiscussionError = function (error) {
  ui.showMessage('Error deleting session from database.')
}

const refreshUpdateModal = function (response) {
  const id = response.discussion.id
  const updateFormHtml = updateFormTemplate({ discussion: response.discussion })
  $('#update-topic-form').html(updateFormHtml)
  $('button.remove, button.edit, #update-topic-form').data('id', id)
  $('#updateTopicModal').modal('show')
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
