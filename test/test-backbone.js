/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('tiny:backbone', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../backbone'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('name', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'somefile.js'
    ]);
  });
});
