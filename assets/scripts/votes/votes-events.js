'use strict'

const showWinnersTemplate = require('../templates/winners-list.handlebars')
const getFormFields = require('../../../lib/get-form-fields')
const discussionsUi = require('../discussions/discussions-ui')
const discussionsApi = require('../discussions/discussions-api')
const votesUi = require('./votes-ui')
const votesApi = require('./votes-api')
const store = require('../store')

// event handlers for...
const addHandlers = function () {
  $('.discussion-list-voting').on('click', '.upvote', onCreateVote)
  $('.discussion-list-voting').on('click', '.downvote', onDeleteVote)
  $('#pick-winners-form').on('submit', pickWinners)
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

const pickWinners = function (event) {
  event.preventDefault()
  console.log('in pickWinners')
  const data = getFormFields(event.target)
  console.log('data from form is: ', data)
  const slots = data.timeslots * data.rooms
  console.log('total slots available: ', slots)
  discussionsApi.getDiscussions()
    .then((response) => {
      const discussions = response.discussions
      console.log('discussions before sort: ', discussions)
      // sort array so discussions with the most votes come first
      discussions.sort((a, b) => { return b.votes.length - a.votes.length })
      console.log('discussions after sort: ', discussions)
      let proposedWinners = []
      if (discussions.length <= slots) {
        $('.winners-message').html(`You have ${slots} session slots to fill and
          only ${discussions.length} proposals. Everyone wins!`)
        proposedWinners = discussions
      } else {
        const minVotesToWin = discussions[slots - 1].votes.length
        proposedWinners = discussions.filter((discussion) => discussion.votes.length >= minVotesToWin)
        // if there's a tie, map to winners to add a tied boolean field to those
        // with the least votes
        if (proposedWinners.length !== slots) {
          proposedWinners = discussions.filter((discussion) =>
            discussion.votes.length >= minVotesToWin).map((discussion) => {
              if (discussion.votes.length === minVotesToWin) {
                discussion.tied = true
              } else {
                discussion.tied = false
              }
              return discussion
            })
          const tiedDiscussions = proposedWinners.filter((discussion) => discussion.votes.length === minVotesToWin).length
          $('.winners-message').html(`Of the ${discussions.length} session ideas
            proposed, there are ${proposedWinners.length} top contenders for
            your ${slots} slots, with a tie for last place. Here they are,
            including the ${tiedDiscussions} ideas trailing the pack at
            ${minVotesToWin} votes each.`)
        } else {
          $('.winners-message').html(`Of the ${discussions.length} session ideas
            proposed, the choice is clear! These are your attendees' top picks
            for your ${slots} session slots.`)
        }
      }
      console.log('proposed winners: ', proposedWinners)
      const showWinnersHtml = showWinnersTemplate({ discussions: proposedWinners })
      $('.winners-list').html(showWinnersHtml)
    })
    .catch(votesUi.pickWinnersError)
}

module.exports = {
  addHandlers: addHandlers,
  onDeleteVote: onDeleteVote,
  onCreateVote: onCreateVote,
  pickWinners: pickWinners
}
