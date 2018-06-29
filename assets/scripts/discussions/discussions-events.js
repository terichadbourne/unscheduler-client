'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const discussionsUi = require('./discussions-ui')
const discussionsApi = require('./discussions-api')

// event handlers for...
const addHandlers = function () {
  // auth-related buttons
  $('.list-discussions').on('click', onGetDiscussions)
  $('#propose-topic-form').on('submit', onCreateDiscussion)
  $('.discussion-list').on('click', '.update-topic', refreshUpdateModal)
  $('#update-topic-form').on('submit', onUpdateDiscussion)
  $('.remove').on('click', onDeleteDiscussion)
}

const refreshUpdateModal = function (event) {
  $('#updateTopicModal, button.remove, button.edit, #update-topic-form').data('id', $(event.target).data('id'))
  $('#updateTopicModal').modal('show')
  console.log("$('#updateTopicModal').data('id') is ", $('#updateTopicModal').data('id'))
  console.log("$('button.remove').data('id') is ", $('button.remove').data('id'))
  console.log("$('button.edit').data('id') is ", $('button.edit').data('id'))
  console.log("$('#update-topic-form').data('id') is ", $('#update-topic-form').data('id'))
}

const onUpdateDiscussion = function (event) {
  // prevent page refresh
  event.preventDefault()
  console.log('in onUpdateDiscussion')
  console.log('$(event.target) is ', $(event.target))
  const id = $(event.target).data('id')
  console.log(id)
}

const onDeleteDiscussion = function (event) {
  console.log('in onDeleteDiscussion')
  console.log('$(event.target) is ', $(event.target))
  const id = $(event.target).data('id')
  console.log(id)
}

// refresh discussion list
const onCreateDiscussion = function (event) {
  console.log('in onCreateDiscussion')
  //prevent page refresh
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
  onUpdateDiscussion: onUpdateDiscussion,
  onDeleteDiscussion: onDeleteDiscussion
}
