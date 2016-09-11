import watch from 'gulp-watch'
import js from './js'
import css from './css'
import html from './html'
import watchAssets from './watch/assets'
import liveReloadServer from './live-reload/server'

export default function startWatch({
  client,
  server,
  assets,
  common
}) {

  const { root, log } = common

  common.watching = true

  if (client) {

    const { reload, reloadCSS } = liveReloadServer({ log })
    const shared = `${root}/shared`

    watch([`${client.src}/**/*.js`, `${shared}/**/*.js`], () => {
      js({ ...client, ...common }).then(reload)
    })

    watch([`${client.src}/**/*.scss`, `${shared}/**/*.scss`], () => {
      css({ ...client, ...common }).then(reloadCSS)
    })

    watch(`${client.src}/**/*.html`, () => {
      html({ ...client, ...common }).then(
        server ? require('./watch/reloadAfterNodemon') : reload
      )
    })

    watchAssets({ ...assets, ...common })
  }

  if (server) {
    require('./watch/server')({ ...server, ...common })
  }

  log('Watch',
    (client ? 'client'+(server ? ' and ' : '') : '')
    +(server ? 'server' : '')
  )
}
