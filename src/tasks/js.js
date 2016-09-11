import path from 'path'
import gulp from 'gulp'
import browserify from 'gulp-bro'
import rename from 'gulp-rename'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import $if from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import babelConfig from '../babel.config'

export default function js({
  src, dest, name = 'app.js', root, dev = true, log, relative, watching
}) {

  return new Promise(function(resolve, reject) {

    gulp.src(`${src}/index.js`, { read: false }) // recommended option for gulp-bro
      .pipe(browserify({
        entries: [src],
        debug: dev, // Source maps
        transform: [babelify.configure(babelConfig)],
        // Resolve require paths for client and shared lib
        paths: [`${src}/lib`, `${root}/shared`]
      }))
      .pipe($if(!dev, uglify()))
      .pipe(rename(name))
      .pipe(gulp.dest(dest))
      .on('error', function(e) {
        /*eslint-disable no-console*/
        log.error('JS', e.message)
        this.emit('end')
      })
      .on('end', () => {
        !watching && log('JS', `${relative(src)}/index.js -> ${relative(dest)}/${name}`)
        resolve()
      })
  })
}
