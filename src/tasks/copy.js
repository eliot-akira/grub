import gulp from 'gulp'

export default function copy({ src, dest, log, relative, watching }) {

  return new Promise(function(resolve, reject) {
    gulp
      .src(src)
      .pipe(gulp.dest(dest))
      .on('end', () => {
        !watching && log('Copy', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}
