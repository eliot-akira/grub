import build from './build'
import watch from '../tasks/watch'

module.exports = function dev(config) {

  build({ ...config, dev: true })

  .then(() => {

    const { client, server, common } = config

    const { log } = common

    log.info('Dev server')

    if (server) {

      require('../tasks/nodemon')({
        src: server.dest, ...common,
        watch: [ server.dest ].concat(
          client ? [`${client.dest}/index.html`] : []
        )
      })

    } else {

      require('../tasks/static')({
        src: client.dest, ...common
      })
    }

    watch(config)
  })
}
