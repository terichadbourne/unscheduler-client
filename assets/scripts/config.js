'use strict'

let apiUrl
const apiUrls = {
  production: 'https://unscheduler-api.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

let eventId
if (window.location.hostname === 'localhost') {
  eventId = 1
} else {
  eventId = 1
}

module.exports = {
  apiUrl,
  eventId
}
