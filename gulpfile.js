var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task("default", ["sass"], function () {

	gulp.watch("sass/*.scss", ["sass"])
});

gulp.task("sass", function(){
	gulp.src('sass/*.scss')
		.pipe(sass({sourcemap: true}))
		.pipe(gulp.dest('css'));
});