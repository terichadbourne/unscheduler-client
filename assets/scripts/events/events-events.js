'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const eventsUi = require('./events-ui')
const eventsApi = require('./events-api')

// event handlers for...
// const addHandlers = function () {
//   // $('#update-event-form').on('submit', onUpdateEvent)
// }

const onGetEvent = function (event) {
  console.log('in onGetEvent')
  // make API call for event 1, which is the default (and only) event
  eventsApi.getEvent(1)
    .then(eventsUi.getEventSuccess)
    .catch(eventsUi.getEventError)
}

// const onUpdateEvent = function (event) {
//   console.log('in onUpdateEvent')
// }

module.exports = {
  // addHandlers: addHandlers,
  // onUpdateEvent: onUpdateEvent,
  onGetEvent: onGetEvent
}
