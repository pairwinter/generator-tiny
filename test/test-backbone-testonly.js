/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('tiny:backbone', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../backbone'))
      .inDir('/Users/damon/Documents/TestData/generator/testing')
      .withArguments('settings/emailIngestion --testonly')
      .withPrompts({
        testingPath: './develop'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'develop/app/settings/emailIngestionAppTest.html',
      'develop/test/settings/emailIngestionApp-unitTest.js',
      'develop/test/settings/emailIngestionApp-endToEndTest.js'
    ]);
  });
});
