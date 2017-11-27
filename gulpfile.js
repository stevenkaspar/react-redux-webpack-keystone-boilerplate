'use strict';
const gulp       = require('gulp');
const watch      = require('gulp-watch');
const shell      = require('gulp-shell')
const sass       = require('gulp-sass');
const concat     = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const spawn      = require('child_process').spawn;


const paths = {
	/**
	* paths to files that should restart app
	*/
	server_files: [
		'models/**/*',
		'routes/**/*',
		'keystone.js',
		'package.json',
    '!routes/redux-render/**/*.jsx'
	],
	/**
	 * gulp-sass configuration
	 */
	style: {
		watch_files:    'public/styles/src/**/*.scss',
		src:            './public/styles/src/**/*.scss',
		dist:           './public/styles/dist',
		sourcemap_root: '../src'
	},
	/**
	 * webpack config and files to watch
	 */
	webpack: {
		config: 'webpack.config.js',
		watch_files: [
			'public/js/src/**/*',
			'webpack.config.js'
		]
	},
	'webpack-server': {
		config: 'webpack-server.config.js',
		watch_files: [
			'routes/redux-render/**/*.jsx',
			'webpack-server.config.js'
		]
	},
};

/** starting and restarting keystone app **/
gulp.task('watch-app', done => {

	// node process
	let node_process;
	//
	const dest_path = `.`;

	let restartServer = () => {
	  node_process.kill();
	  node_process = startServer();
	}

	let startServer = () => {
	  var local_node_process = spawn('node', ['keystone'], {cwd: dest_path});
	  local_node_process.on('close', (code, signal) => {
	    console.log(`-- Server process closed --`);
	  });
	  local_node_process.stdout.on('data', (data) => {
	    console.log(`${data}`);
	  });
	  local_node_process.stderr.on('data', (data) => {
	    console.log(`Error: ${data}`);
	  });
	  return local_node_process;
	}

	const watcher = gulp.watch(paths.server_files);
	watcher.on('change', () => restartServer() )

	// start the server process
	node_process = startServer();

	done();
});

/** sass **/
gulp.task('watch-sass', () => {
	gulp.watch(paths.style.watch_files, ['sass']);
});
gulp.task('sass', () => {
	gulp.src(paths.style.src)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('.', {
			sourceRoot: paths.style.sourcemap_root
		}))
		.pipe(gulp.dest(paths.style.dist));
});

/** webpack **/
gulp.task('watch-webpack', () => {
	gulp.watch(paths.webpack.watch_files, ['webpack']);
});
gulp.task('webpack', done => {
	var webpack_process = spawn('./node_modules/.bin/webpack', [
		'--config',
		paths.webpack.config
	]);
	webpack_process.on('close', (code, signal) => {
		done();
	});
	webpack_process.stdout.on('data', (data) => {
		console.log(`${data}`);
	});
	webpack_process.stderr.on('data', (data) => {
		console.log(`Error: ${data}`);
	});
	return webpack_process;
});

/** webpack-server **/
gulp.task('watch-webpack-server', () => {
	gulp.watch(paths['webpack-server'].watch_files, ['webpack-server']);
});
gulp.task('webpack-server', done => {
	var webpack_process = spawn('./node_modules/.bin/webpack', [
		'--config',
		paths['webpack-server'].config
	]);
	webpack_process.on('close', (code, signal) => {
		done();
	});
	webpack_process.stdout.on('data', (data) => {
		console.log(`${data}`);
	});
	webpack_process.stderr.on('data', (data) => {
		console.log(`Error: ${data}`);
	});
	return webpack_process;
});


/** gulp task setup **/
gulp.task('default', ['watch-app', 'watch-sass', 'watch-webpack-server']);//, 'watch-webpack']);
