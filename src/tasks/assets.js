import gulp from 'gulp'

export default function assets({ src, dest, log, relative, watching }) {

  return new Promise(function(resolve, reject) {
    gulp
      .src(`${src}/**/*`)
      .pipe(gulp.dest(dest))
      .on('end', () => {
        !watching && log('Assets', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}
