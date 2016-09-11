import gulp from 'gulp'
import eslint from 'gulp-eslint'

export default function html({ src, log, relative, watching }) {

  return new Promise(function(resolve, reject) {
    gulp
      .src(src)
      .pipe(eslint())
      .pipe(eslint.format())
      .on('end', () => {
        !watching && log('Lint', relative(src))
        resolve()
      })
  })
}
