var gulp       = require('gulp');
var del        = require('del');
var useref     = require('gulp-useref');
var gulpif     = require('gulp-if');
var csso       = require('gulp-csso');
var minifyHTML = require('gulp-minify-html');
var uglify     = require('gulp-uglify');

gulp.task('clean:dist', function(cb) {
	del.sync([
		// globbing pattern to match everything inside the `dist` folder
		'dist/**/*',
		'assets/**/*',
		'index.html'
	]);
	cb();
});

gulp.task('clean:root', function(cb) {
	del.sync([
		// globbing pattern to match everything inside the `dist` folder
		'assets',
		'index.html'
	]);
	cb();
});

// Copy the fonts
gulp.task('fonts', function(cb) {
	gulp.src(['app/bower_components/fontawesome/fonts/*']).pipe(gulp.dest('dist/assets/fonts'));
});

// Copy the assets folder
gulp.task('assets', function(cb) {
	gulp.src(['app/assets/**/*']).pipe(gulp.dest('dist/assets'));
});

// Minify HTML
gulp.task('minify-html', function() {
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src('./dist/*.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./dist/'));
});

// Minify the CSS & JS
gulp.task('minify-css-js', function() {
	var assets = useref.assets();
	return gulp.src('app/index.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', csso()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

// Move files to root
gulp.task('dist-to-root', ['clean:root'], function() {
	gulp.src('dist/assets/**/*')
	.pipe(gulp.dest('./assets'));
	gulp.src('dist/index.html')
	.pipe(gulp.dest('./'));

});

// Default task
gulp.task('default', ['clean:root', 'clean:dist', 'minify-css-js', 'assets', 'fonts']);
