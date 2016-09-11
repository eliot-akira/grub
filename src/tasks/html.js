import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import $if from 'gulp-if'
import ejs from 'gulp-ejs'

export default function html({
  src, dest, dev = true, log, relative, watching, electron = false
}) {

  const script = injectScript({ electron, dev })

  return new Promise(function(resolve, reject) {
    gulp.src(`${src}/index.html`)
      .pipe(ejs({ script }, { ext: '.html' }))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        !watching && log('HTML', `${relative(src)}/index.html -> ${relative(dest)}/index.html`)
        resolve()
      })
  })
}

function injectScript({ electron, dev }) {

  let script = null

  if (electron) {

    script =
      `<script>electron = require('electron');${
        dev ? `require(process.cwd()+'/electron-connect').client.create()` : ''
      }</script>`

  } else if (dev) {

    const liveReloadClient = fs.readFileSync(
      path.join(__dirname, 'live-reload/client.js'), 'utf-8'
    )

    script = `<script>${liveReloadClient}</script>`
  }

  return script
}