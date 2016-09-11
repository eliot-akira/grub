import gulp from 'gulp'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import minifyCSS from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import $if from 'gulp-if'

export default function css(config) {

  const {
    root, src, dest, dev = true, name = 'app.css',
    log, relative, watching
  } = config

  return new Promise(function(resolve, reject) {

    gulp.src(`${src}/index.scss`)
      .pipe($if(dev, sourcemaps.init()))
      .pipe(sass({
        keepSpecialComments: false,
        // Resolve require paths for client and shared lib
        includePaths: [`${src}/lib`, `${root}/shared`],
        //relativeTo: './app',
        processImport: false // ?
      }))
      .on('error', function(e) {
        log.error('CSS', e.message)
        this.emit('end')
      })
      .pipe(autoprefixer({ browsers: ['last 2 versions', 'IE 10', '> 1%'], cascade: false }))
      .pipe($if(!dev, minifyCSS()))
      .pipe(rename(name))
      .pipe($if(dev, sourcemaps.write()))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        !watching && log('CSS', `${relative(src)}/index.scss -> ${relative(dest)}/${name}`)
        resolve()
      })
  })
}
