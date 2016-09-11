import gulp from 'gulp'
import { reload } from '../live-reload/server'

module.exports = function watchAssets({ src, dest, log, relative }) {

  // Copy each changed asset file

  gulp.watch(`${src}/**`, (file) => (
    gulp.src(file.path, { base: src })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        //log('Watch', `Copied assets file: ${relative(file.path)}`)
        reload()
      })
  ))
}
