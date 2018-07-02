'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const authEvents = require('./auth/auth-events')
const discussionsEvents = require('./discussions/discussions-events')
const votesEvents = require('./votes/votes-events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.addHandlers()
  discussionsEvents.addHandlers()
  votesEvents.addHandlers()
  discussionsEvents.onGetDiscussions()
})
