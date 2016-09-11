import nodemon from 'nodemon'

module.exports = function startNodemon({ src, watch, log, relative }) {

  log('Nodemon', `Serve from ${relative(src)}`)

  nodemon({
    script: src,
    watch,
    ignore: ['.git', 'node_modules']
  })
  //.on('restart', () => log('Nodemon', 'Restart'))
  //.on('exit', () => {})

  process.once('SIGINT', function () {
    process.exit()
  })
}
