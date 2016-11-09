const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const browserify = require('gulp-browserify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babelify = require('babelify');

gulp.task('babel', ()=> {
    return gulp.src('./app/babel/main.js')
        .pipe(browserify({
            transform: ['babelify'],
            extensions: ['.js']
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', ()=> {
    return gulp.src('app/scss/page.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('sass:dev', ()=> {
    return gulp.src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('clean', ()=> {
    return gulp.src(['public/css', 'public/js', 'public/assets'] , { read: false })
        .pipe(clean())
})

gulp.task('html', ()=> {
    return gulp.src('app/*.html')
        .pipe(rename('_index.html'))
        .pipe(gulp.dest('./views'))

})

gulp.task('image', ()=> {
    return gulp.src('app/assets/*.{png,jpg,gif,ico,jpeg}')
        // .pipe(imagemin())
        .pipe(gulp.dest('public/assets'))

})

gulp.task('serve', ['sass:dev', 'babel'], ()=> {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });

    gulp.watch('app/scss/*.scss', ['sass:dev']);
    gulp.watch('app/babel/*.js', ['babel']).on('change', browserSync.reload);
    gulp.watch('app/index.html').on('change', browserSync.reload);
    gulp.watch('gulpfile.js').on('change', browserSync.reload);
})

gulp.task('build', ['clean','html', 'sass', 'babel', 'image'])
gulp.task('default', ['serve']);