'use strict'
// require dependencies
const ui = require('../ui')
// const store = require('../store')

const getDiscussionsSuccess = function (response) {
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
  ui.showMessage('Error retrrieving all sessions from database.')
}

module.exports = {
  getDiscussionsSuccess: getDiscussionsSuccess,
  getDiscussionsError: getDiscussionsError
}
