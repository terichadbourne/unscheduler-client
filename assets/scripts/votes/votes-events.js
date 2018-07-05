'use strict'

const showWinnersTemplate = require('../templates/winners-list.handlebars')
const getFormFields = require('../../../lib/get-form-fields')
const discussionsUi = require('../discussions/discussions-ui')
const discussionsApi = require('../discussions/discussions-api')
const votesUi = require('./votes-ui')
const votesApi = require('./votes-api')
const store = require('../store')
const ui = require('../ui')

// event handlers for...
const addHandlers = function () {
  $('.discussion-list-voting').on('click', '.upvote', onCreateVote)
  $('.discussion-list-voting').on('click', '.downvote', onDeleteVote)
  $('#pick-winners-form').on('submit', pickWinners)
}

const onDeleteVote = function (event) {
  if (!store.user) {
  } else {
    const discussionId = $(event.target).data('id')
    const userId = store.user.id
    const matchedDiscussion = store.discussions.find(discussion => discussion.id === discussionId)
    // find the first vote for the current user which is for the session clicked
    const matchedVote = matchedDiscussion.votes.find(vote => vote.user_id === userId)
    if (matchedVote) {
      const id = matchedVote.id
      votesApi.deleteVote(id)
      // if delete vote is successful, immediately run getDiscussions to update
      // list, calling that function's success function
        .then(() => { return discussionsApi.getDiscussions() })
        .then(discussionsUi.getDiscussionsSuccess)
        // if delete fails, use own error function
        .catch(votesUi.createVoteError)
    } else {
      ui.showMessage('You have no votes to delete for that session')
    }
  }
}

// refresh discussion list
const onCreateVote = function (event) {
  // capture user credentials from form and send to server
  if (!store.user) {
  } else {
    const data = {}
    data.vote = {}
    data.vote.user_id = store.user.id
    data.vote.discussion_id = $(event.target).data('id')
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
  const data = getFormFields(event.target)
  const slots = data.timeslots * data.rooms
  discussionsApi.getDiscussions()
    .then((response) => {
      const discussions = response.discussions
      // sort array so discussions with the most votes come first
      discussions.sort((a, b) => { return b.votes.length - a.votes.length })
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
