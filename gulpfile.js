'use strict';

const co = require('co');
const gulp = require('gulp');
const apidoc = require('gulp-apidoc');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

const {sequelize} = require('./models');
const seed = require('./db/seed');

const gulpSequelize = require('gulp-sequelize')(sequelize, {
  migrations: {
    path: 'db/migrations',
    pattern: /^[\d\w-]+\.js$/
  }
});

const jsPaths = [
  'api/**/*.js', 'middleware/**/*.js',
  'bin/www', 'models/**/*.js', 'test/**/*.js'
];

gulp.task('apidoc', (done) => {
  apidoc({
    src: 'api/',
    dest: 'docs/',
    debug: true,
    includeFilters: [ ".*\\.js$" ],
    config: 'apidoc.json'
  }, done);
});

gulp.task('start', () => {
  nodemon({
    script: 'bin/www',
    ext: 'js html',
    cwd: __dirname,
    ignore: [],
    watch: ['server', 'api'],
    env: {
      'NODE_ENV': 'development'
    },
    nodeArgs: ['--harmony_destructuring']
  });
});

gulp.task('lint', () => {
  return gulp.src(jsPaths)
    .pipe(eslint({
      extends: 'eslint:recommended',
      envs: ['commonjs', 'node', 'es6', 'mocha']
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src(['test/**/*-test.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('db:seed', seed);

gulp.task('db:migrate', gulpSequelize.up);

gulp.task('default', ['start', 'apidoc', 'lint', 'test']);

gulp.watch(['./api/**/*'], ['apidoc']);
gulp.watch(jsPaths, ['lint', 'test']);
