gulp = require 'gulp'
jshint = require 'gulp-jshint'

jsPaths = ['./index.js', './{lib,test}/*.js', './bin/dummyimage']

gulp.task 'jshint', ->
  gulp.src jsPaths
    .pipe jshint()

gulp.task 'watch', ->
  gulp.watch jsPaths, ['jshint']

gulp.task 'test', ->
  # TODO: Run test.

gulp.task 'default', ['watch']
