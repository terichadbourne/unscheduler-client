'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const discussionsUi = require('./discussions-ui')
const discussionsApi = require('./discussions-api')

// event handlers for...
const addHandlers = function () {
  // auth-related buttons
  $('.list-discussions').on('click', onGetDiscussions)
  $('#propose-topic-form').on('submit', onCreateDiscussion)
  $('.discussion-list-proposing').on('click', '.update-topic', onGetDiscussion)
  $('#update-topic-form').on('submit', onUpdateDiscussion)
  $('.remove').on('click', onDeleteDiscussion)
}

const onGetDiscussion = function (event) {
  const id = $(event.target).data('id')
  discussionsApi.getDiscussion(id)
    .then(discussionsUi.refreshUpdateModal)
    .catch(discussionsUi.getDiscussionError)
}

const onUpdateDiscussion = function (event) {
  // prevent page refresh
  event.preventDefault()
  const data = {}
  data.discussion = getFormFields(event.target)
  data.discussion.id = $(event.target).data('id')
  discussionsApi.updateDiscussion(data)
  // if create discussion is successful, immediately run getDiscussions to
  // updatelist, calling that function's success function afterward
    .then(() => { return discussionsApi.getDiscussions() })
    .then(discussionsUi.getDiscussionsSuccess)
    // if create fails, use own error function
    .catch(discussionsUi.updateDiscussionError)
}

const onDeleteDiscussion = function (event) {
  const id = $(event.target).data('id')
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
  // prevent page refresh
  event.preventDefault()
  // capture user credentials from form and send to server
  const data = {}
  data.discussion = getFormFields(event.target)
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
const onGetDiscussions = function () {
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
