'use strict'
// require dependencies
const ui = require('../ui')
const store = require('../store')
const discussionsEvents = require('../discussions/discussions-events')
const eventsEvents = require('../events/events-events')

// run on sign up error
const signUpError = function (error) {
  showAuthErrorMessage('That email is already taken. Please pick a new one or sign in to an existing account instead.')
  clearAuthForms()
}

// run on sign in success
// (also run after successful sign-up leads to automatic sign-in, if successful)
const signInSuccess = function (response) {
  // if there was a message about needing to sign in, remove it
  eventsEvents.onGetEvent()
  ui.clearMessage()
  $('.login-req').removeClass('hidden')
  $('.logout-req').addClass('hidden')
  // store data retricved from server
  store.user = response.user
  // show relevant admin details if user is authorized
  if (store.user.admin) {
    $('.show-admin').removeClass('hidden')
    $('.admin-panel, .hide-admin').addClass('hidden')
    $("input[name='name'], input[name='max_votes']").val('')
    $("input[name='name']").attr('placeholder', store.user.events[0].name)
    $("input[name='max_votes']").attr('placeholder', store.user.events[0].max_votes)
  } else {
    $('.admin-panel, .hide-admin, .show-admin').addClass('hidden')
  }
  // change which auth options are available
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('.sign-out').removeClass('hidden')
  $('.change-password').removeClass('hidden')
  // clear form fields and hide modal
  clearAuthForms()
  $('#signInModal').modal('hide')
  $('#signUpModal').modal('hide')
  // refresh list of discussions to get accurate editable values
  discussionsEvents.onGetDiscussions()
}

// run on sign-in error
const signInError = function (error) {
  // display error message and clear form fields
  showAuthErrorMessage('Email or password was incorrect. Please try again or sign up for a new account instead.')
  clearAuthForms()
}

// run on successful password change (note no response expected from server)
const changePasswordSuccess = function (response) {
  // diplay success message
  showAuthSuccessMessage('Success! Your password has been changed!')
  setTimeout(clearAuthMessage, 3000)
  // clear form fields and hide modal
  clearAuthForms()
  $('#changePasswordModal').modal('hide')
}

// run password change fails
const changePasswordError = function (error) {
  // display error message and clear form fields
  showAuthErrorMessage('Oops! Please correct your old password and try again.')
  clearAuthForms()
}

// run on successful sign-outline (note no response expected from server)
const signOutSuccess = function (response) {
  $('.propose-topic').addClass('hidden')
  // remove user record and token from `store`
  delete store.user
  delete store.event
  $('.admin-panel, .show-admin, .hide-admin').addClass('hidden')
  $('.login-req').addClass('hidden')
  $('.logout-req').removeClass('hidden')
  // clear messages
  $('.voting-instructions, .proposing-instructions').addClass('hidden')
  // change which auth options are available
  $('.sign-up').removeClass('hidden')
  $('.sign-in').removeClass('hidden')
  $('.sign-out').addClass('hidden')
  $('.change-password').addClass('hidden')
  // refresh list of discussions to remove editable status
  discussionsEvents.onGetDiscussions()
}

// run on sign-out error
const signOutError = function (error) {
  // show error and clear auth forms
  showAuthErrorMessage("Something went wrong. You're still logged in. Quick, show this error message to the nearest developer: ", error)
  clearAuthForms()
}

// display a message to the user on main screen and in modal
const showAuthErrorMessage = function (message) {
  $('.auth-alert-modal').html(message).removeClass('hidden')
}

const showAuthSuccessMessage = function (message) {
  $('.auth-alert-main').html(message).removeClass('hidden')
}

// remove message currently displayed to user
const clearAuthMessage = function () {
  $('.auth-alert-main').addClass('hidden').html('')
  $('.auth-alert-modal').addClass('hidden').html('')
}

// clear values from all auth forms
const clearAuthForms = function () {
  $('input').val('')
}

module.exports = {
  signUpError: signUpError,
  signInSuccess: signInSuccess,
  signInError: signInError,
  changePasswordSuccess: changePasswordSuccess,
  changePasswordError: changePasswordError,
  signOutSuccess: signOutSuccess,
  signOutError: signOutError,
  showAuthErrorMessage: showAuthErrorMessage,
  showAuthSuccessMessage: showAuthSuccessMessage,
  clearAuthMessage: clearAuthMessage,
  clearAuthForms: clearAuthForms
}
