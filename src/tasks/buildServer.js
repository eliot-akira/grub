import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../babel.config'

export default function buildServer(config) {

  const { src, dest, log, relative, watching } = config

  return new Promise(function(resolve, reject) {

    gulp.src(`${src}/**/*.js`)
      .pipe(babel(babelConfig))
      .on('error', function(e) {
        log.error('Server', e.message)
        this.emit('end')
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        !watching && log('Server', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}
