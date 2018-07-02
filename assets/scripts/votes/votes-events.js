'use strict'

const discussionsUi = require('../discussions/discussions-ui')
const discussionsApi = require('../discussions/discussions-api')
const votesUi = require('./votes-ui')
const votesApi = require('./votes-api')
const store = require('../store')

// event handlers for...
const addHandlers = function () {
  $('.discussion-list').on('click', '.upvote', onCreateVote)
  $('.discussion-list').on('click', '.downvote', onDeleteVote)
}

const onDeleteVote = function (event) {
  console.log('in onDeleteVote')
  if (!store.user) {
    console.log("no user signed in so can't delete vote")
  } else {
    const discussionId = $(event.target).data('id')
    const userId = store.user.id
    console.log('user_id is: ', userId)
    console.log('discussion_id is: ', discussionId)
    console.log('store.user.votes is: ', store.user.votes)
    console.log('store.discussions is: ', store.discussions)
    const matchedDiscussion = store.discussions.find(discussion => discussion.id === discussionId)
    console.log('matchedDiscussion: ', matchedDiscussion)
    // find the first vote for the current user which is for the session clicked
    const matchedVote = matchedDiscussion.votes.find(vote => vote.user_id === userId)
    if (matchedVote) {
      console.log('matchedVote: ', matchedVote)
      const id = matchedVote.id
      console.log('vote id sought is', id)
      votesApi.deleteVote(id)
      // if delete vote is successful, immediately run getDiscussions to update
      // list, calling that function's success function
        .then(() => { return discussionsApi.getDiscussions() })
        .then(discussionsUi.getDiscussionsSuccess)
        // if delete fails, use own error function
        .catch(votesUi.createVoteError)
    } else {
      console.log('this user has no votes to delete for that session')
    }
  }
}

// refresh discussion list
const onCreateVote = function (event) {
  console.log('in onCreateVote')
  console.log("$(event.target).data('id') is: ", $(event.target).data('id'))
  // capture user credentials from form and send to server
  if (!store.user) {
    console.log("no user signed in so can't create vote")
  } else {
    console.log('store.user.id is: ', store.user.id)
    const data = {}
    data.vote = {}
    data.vote.user_id = store.user.id
    data.vote.discussion_id = $(event.target).data('id')
    console.log('data is: ', data)
    // send request to server
    votesApi.createVote(data)
    // if create vote is successful, immediately run getVotes to
    // updatelist, calling that function's success function afterward
      .then(() => { return discussionsApi.getDiscussions() })
      .then(discussionsUi.getDiscussionsSuccess)
      // if create fails, use own error function
      .catch(votesUi.createVoteError)
  }
}

module.exports = {
  addHandlers: addHandlers,
  onDeleteVote: onDeleteVote,
  onCreateVote: onCreateVote
}
