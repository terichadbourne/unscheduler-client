'use strict'
// require dependencies
const ui = require('../ui')
// const store = require('../store')

const getDiscussionsSuccess = function (response) {
  // if you were redirected to getDiscussionsSuccess from createDiscussion,
  // hide the open modal you used to submit the proposal
  $('#proposeTopicModal').modal('hide')
  console.log('response.discussions from getDiscussionSuccess is: ', response.discussions)
  const discussionsArray = response.discussions
  console.log('number of discussions found: ', discussionsArray.length)
  if (discussionsArray.length === 0) {
    $('.discussion-list').html('No sessions to display. Have a topic to propose?')
  } else {
    $('.discussion-list').html('')
    discussionsArray.forEach((discussion) => {
      $('.discussion-list').append(`<li>${discussion.title} (Editable: ${discussion.editable})</li>`)
    })
  }
}

const getDiscussionsError = function (error) {
  console.log('in getDiscussionsError')
  ui.showMessage('Error retrieving all sessions from database.')
}

// const createDiscussionSuccess = function (response) {
//   console.log('in createDiscussionSuccess')
//   console.log('successful response is ', response)
//   $('#proposeTopicModal').modal('hide')
//
// }

const createDiscussionError = function (error) {
  console.log('in createDiscussionError')
  ui.showMessage('Error creating new discussion topic in database.')
}

module.exports = {
  getDiscussionsSuccess: getDiscussionsSuccess,
  getDiscussionsError: getDiscussionsError,
  // createDiscussionSuccess: createDiscussionSuccess,
  createDiscussionError: createDiscussionError
}
