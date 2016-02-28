'use strict';

const co = require('co');
const gulp = require('gulp');
const apidoc = require('gulp-apidoc');

gulp.task('apidoc', (done) => {
  apidoc({
    src: 'api/',
    dest: 'docs/',
    debug: true,
    includeFilters: [ ".*\\.js$" ]
  }, done);
});

gulp.task('default', ['apidoc']);

gulp.watch(['./api/**/*'], ['apidoc']);
