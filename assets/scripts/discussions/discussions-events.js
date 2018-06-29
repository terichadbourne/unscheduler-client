'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const discussionsUi = require('./discussions-ui')
const discussionsApi = require('./discussions-api')

// event handlers for...
const addHandlers = function () {
  // auth-related buttons
  $('.list-discussions').on('click', onGetDiscussions)
  $('#propose-topic-form').on('submit', onCreateDiscussion)
  $('.discussion-list').on('click', '.update-topic', onGetDiscussion)
  $('#update-topic-form').on('submit', onUpdateDiscussion)
  $('.remove').on('click', onDeleteDiscussion)
}

const onGetDiscussion = function (event) {
  console.log('in onGetDiscussion')
  const id = $(event.target).data('id')
  console.log(id)
  discussionsApi.getDiscussion(id)
    .then(discussionsUi.refreshUpdateModal)
    .catch(discussionsUi.getDiscussionError)
}

const onUpdateDiscussion = function (event) {
  // prevent page refresh
  event.preventDefault()
  console.log('in onUpdateDiscussion')
  console.log('$(event.target) is ', $(event.target))
  const id = $(event.target).data('id')
  console.log('id is:', id)
  const data = {}
  data.discussion = getFormFields(event.target)
  console.log('data is: ', data)
  data.discussion.id = $(event.target).data('id')
  console.log('data.discussion.title is: ', data.discussion.title)
  console.log('data.discussion.id is: ', data.discussion.id)
  discussionsApi.updateDiscussion(data)
  // if create discussion is successful, immediately run getDiscussions to
  // updatelist, calling that function's success function afterward
    .then(() => { return discussionsApi.getDiscussions() })
    .then(discussionsUi.getDiscussionsSuccess)
    // if create fails, use own error function
    .catch(discussionsUi.updateDiscussionError)
}

const onDeleteDiscussion = function (event) {
  console.log('in onDeleteDiscussion')
  console.log('$(event.target) is ', $(event.target))
  const id = $(event.target).data('id')
  console.log(id)
  discussionsApi.deleteDiscussion(id)
  // if delete discussion is successful, close modal and then immediately run
  // getDiscussions to updatelist, calling that function's success function
    .then(() => { return discussionsApi.getDiscussions() })
    .then(discussionsUi.getDiscussionsSuccess)
    // if create fails, use own error function
    .catch(discussionsUi.deleteDiscussionError)
}

// refresh discussion list
const onCreateDiscussion = function (event) {
  console.log('in onCreateDiscussion')
  // prevent page refresh
  event.preventDefault()
  // capture user credentials from form and send to server
  const data = {}
  data.discussion = getFormFields(event.target)
  console.log('data is: ', data)
  // send request to server
  discussionsApi.createDiscussion(data)
  // if create discussion is successful, immediately run getDiscussions to
  // updatelist, calling that function's success function afterward
    .then(() => { return discussionsApi.getDiscussions() })
    .then(discussionsUi.getDiscussionsSuccess)
    // if create fails, use own error function
    .catch(discussionsUi.createDiscussionError)
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
  onGetDiscussions: onGetDiscussions,
  onGetDiscussion: onGetDiscussion,
  onUpdateDiscussion: onUpdateDiscussion,
  onDeleteDiscussion: onDeleteDiscussion,
  onCreateDiscussion: onCreateDiscussion
}
