'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const eventsUi = require('./events-ui')
const eventsApi = require('./events-api')
const store = require('../store')
const config = require('../config')

// event handlers
const addHandlers = function () {
  // $('#update-event-form').on('submit', onUpdateEvent)
  $('button.stage').on('click', onUpdateStage)
  $('#update-event-name-form, #update-max-votes-form').on('submit', onUpdateEvent)
  $('.show-admin').on('click', () => {
    $('.admin-panel, .hide-admin').removeClass('hidden')
    $('.show-admin').addClass('hidden')
    $("input[name='name'], input[name='max_votes']").val('')
    $("input[name='name']").attr('placeholder', store.event.name)
    $("input[name='max_votes']").attr('placeholder', store.event.max_votes)
  })
  $('.hide-admin').on('click', () => {
    $('.admin-panel, .hide-admin').addClass('hidden')
    $('.show-admin').removeClass('hidden')
  })
}

const onGetEvent = function () {
  // make API call for the default (and only) event (id stored in config)
  eventsApi.getEvent(config.eventId)
    .then(eventsUi.getEventSuccess)
    .catch(eventsUi.getEventError)
}

const setDefaultData = function () {
  // const eventId = store.event.id
  // const adminId = store.event.user
  const data = {}
  data.event = {
    name: store.event.name,
    max_votes: store.event.max_votes,
    proposals_open: store.event.proposals_open,
    voting_open: store.event.voting_open,
    schedule_finalized: store.event.schedule_finalized,
    user_id: store.event.user
  }
  return data
}

const onUpdateStage = function (event) {
  // grab previous data
  const data = setDefaultData()
  const newStage = $(event.target).data('id')
  // set all stages to false
  data.event.proposals_open = false
  data.event.voting_open = false
  data.event.schedule_finalized = false
  // then set the selected stage to true
  data.event[newStage] = true
  eventsApi.updateEvent(data)
    .then(eventsUi.updateEventSuccess)
    .catch(eventsUi.updateEventError)
}

// updates a single key (not radio button)
const onUpdateEvent = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  const data = setDefaultData()
  const key = Object.keys(formData)[0]
  data.event[`${key}`] = formData[`${key}`]
  eventsApi.updateEvent(data)
    .then(eventsUi.updateEventSuccess)
    .catch(eventsUi.updateEventError)
}

module.exports = {
  addHandlers: addHandlers,
  onUpdateEvent: onUpdateEvent,
  onGetEvent: onGetEvent,
  setDefaultData: setDefaultData,
  onUpdateStage: onUpdateStage
}
