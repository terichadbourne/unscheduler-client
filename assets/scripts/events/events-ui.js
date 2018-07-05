'use strict'
// require dependencies
const ui = require('../ui')
const store = require('../store')

const getEventSuccess = function (response) {
  console.log('in getEventSuccess')
  console.log('response: ', response)
  store.event = response.event
  console.log('store.event: ', store.event)
  const eventStage = response.event.stage
  updateStage(eventStage)
}

const updateStage = function (stage) {
  console.log('in updateStage')
  $('#max-votes').html(store.event.max_votes)
  $('#event-name').html(store.event.name)
  $('.stage-dependent').addClass('hidden')
  $(`.${stage}`).removeClass('hidden')
  $(`.event-stage .stage`).removeClass('highlight')
  $(`.event-stage .${stage}`).addClass('highlight')
}

const getEventError = function (error) {
  console.log('in getEventError')
  ui.showMessage('Error getting event details from database.')
}

const updateEventError = function (error) {
  console.log('in updateEventError')
  ui.showMessage('Error updating event details in database.')
}

const updateEventSuccess = function (response) {
  console.log('in updateEventSuccess')
  console.log('response: ', response)
  store.event = response.event
  $("input[name='name'], input[name='max_votes']").val('')
  $("input[name='name']").attr('placeholder', store.event.name)
  $("input[name='max_votes']").attr('placeholder', store.event.max_votes)
  updateStage(response.event.stage)
}

module.exports = {
  updateEventError: updateEventError,
  getEventError: getEventError,
  updateEventSuccess: updateEventSuccess,
  getEventSuccess: getEventSuccess,
  updateStage: updateStage
}
