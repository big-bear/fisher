var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();


gulp.task('css', function() {
	gulp.src('css/*.css').
	pipe(plugins.minifyCss).
	pipe(gulp.dest('dist/mincss'))
})


gulp.task('watch', function() {
	browserSync.reload()
})

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
	gulp.watch(['./css/*.css', './js/*.js', '*.html'], ['watch']);
})