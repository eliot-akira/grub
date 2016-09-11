import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../../babel.config'
import reloadAfterNodemon from './reloadAfterNodemon'

module.exports = function watchServer({ src, dest, log, relative }) {

  // Compile each changed server file

  gulp.watch(`${src}/**/*.js`, (file) => {
    return gulp.src(file.path, { base: src })
      .pipe(babel(babelConfig))
      .on('error', function(e) {
        log.error('Watch', `Error building server: ${e.message}`)
        this.emit('end')
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        //log('Watch', `Compiled server file: ${relative(file.path)}`)
        // Nodemon is watching: build/server
        reloadAfterNodemon()
      })
  })
}
