import js from '../tasks/js'
import css from '../tasks/css'
import html from '../tasks/html'
import copyAssets from '../tasks/assets'
import buildServer from '../tasks/buildServer'

module.exports = function build(config) {

  const {
    client,
    server,
    assets,
    common
  } = config

  const { log } = common

  log.info('Build')

  let tasks = []

  if (client) tasks.push(Promise.all([
    js({ ...client, ...common }),
    css({ ...client, ...common }),
    html({ ...client, ...common }),
    copyAssets({ ...assets, ...common })
  ]))

  if (server) tasks.push(Promise.all([
    buildServer({ ...server, ...common })
  ]))

  return Promise.all(tasks)
}
