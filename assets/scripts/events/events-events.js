'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const eventsUi = require('./events-ui')
const eventsApi = require('./events-api')
const store = require('../store')
const config = require('../config')

// event handlers
const addHandlers = function () {
  // $('#update-event-form').on('submit', onUpdateEvent)
  $('button.stage').on('click', onUpdateStage)
}

const onGetEvent = function (event) {
  console.log('in onGetEvent')
  // make API call for event 1, which is the default (and only) event
  eventsApi.getEvent(config.eventId)
    .then(eventsUi.getEventSuccess)
    .catch(eventsUi.getEventError)
}

const setDefaultData = function () {
  // const eventId = store.event.id
  // const adminId = store.event.user
  console.log('inSetDefaultData')
  console.log(store.event)
  const data = {}
  data.event = {
    name: store.event.name,
    max_votes: store.event.max_votes,
    proposals_open: false,
    voting_open: false,
    schedule_finalized: false,
    user_id: store.event.user
  }
  console.log('data is: ', data)
  return data
}

const onUpdateStage = function (event) {
  const data = setDefaultData()
  console.log('in onChangeStage and data is: ', data)
  const newStage = $(event.target).data('id')
  console.log('new stage is: ', newStage)
  data.event[newStage] = true
  console.log('revised data with new stage: ', data)
  eventsApi.updateEvent(data)
    .then(eventsUi.updateEventSuccess)
    .catch(eventsUi.updateEventError)
}

// const onUpdateEvent = function (event) {
//   // prevent page refresh
//   event.preventDefault()
//   console.log('in onUpdateEvent')
//   console.log('event.target is ', event.target)
//   console.log('event.target.form is ', event.target.form)
//   const data = {}
//   data.event = getFormFields(event.target)
//   console.log('data.event is: ', data.event)
// }

module.exports = {
  addHandlers: addHandlers,
  // onUpdateEvent: onUpdateEvent,
  onGetEvent: onGetEvent,
  setDefaultData: setDefaultData,
  onUpdateStage: onUpdateStage
}
