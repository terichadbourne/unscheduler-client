'use strict'
// require dependencies
const ui = require('../ui')
// const store = require('../store')

const getDiscussionsSuccess = function (response) {
  console.log('response.discussions from getDiscussionSuccess is: ', response.discussions)
  const discussionsArray = response.discussions
  ui.showMessage('in getDiscussionsSuccess')
  $('.discussion-list').html('')
  discussionsArray.forEach((discussion)=> {
    $('.discussion-list').append(`<li>${discussion.title} (Editable: ${discussion.editable})</li>`)
  }

  )

}

const getDiscussionsError = function (error) {
  console.log('in getDiscussionsError')
  ui.showMessage('in getDiscussionsError')
}

module.exports = {
  getDiscussionsSuccess: getDiscussionsSuccess,
  getDiscussionsError: getDiscussionsError
}
