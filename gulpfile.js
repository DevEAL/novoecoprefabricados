const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      minifiyCSS = require('gulp-minify-css'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;

gulp.task('browser-sync', ()=> {
  const files =[
    './sass',
    '/*.js',
    '/*.html'
  ];

  browserSync.init(files, {
    proxy:'localhost/reciclados-novo/novo/',
    notify: false
  });
})
  
gulp.task('scss-task', () => {
  return gulp.src('./sass/*.scss').
        pipe(sourcemaps.init({loadMaps: true})).
        pipe(sass({
          outputStyle: 'compressed',
          sourceComments: true
        })).
        pipe(autoprefixer()).
        pipe(sourcemaps.write()).
        pipe(concat('styles.css')).
        pipe(reload({stream:true})).
        pipe(gulp.dest('./css/'))
});

gulp.task('watch', () => {
  gulp.watch('sass/*.scss', gulp.series('scss-task'));
});

gulp.task('default', gulp.parallel('scss-task', 'browser-sync', 'watch'));