import nodemon from 'nodemon'
import { reload } from '../live-reload/server'

module.exports = function reloadAfterNodemon() {
  nodemon.once('start', () => {
    setTimeout(reload, 500)
  })
}