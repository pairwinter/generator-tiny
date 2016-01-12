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
      .withArguments('settings/emailIngestion')
      .withPrompts({
        resourcesPath: "./resources/javascripts",
        appParentFolderName: "components",
        moduleType: 'grid',
        formValidation: true,
        templateScriptNames: '',
        testingPath: './develop'
      })
      .on('end', done);
  });

  it('created files', function () {
    assert.file([
      'resources/javascripts/components/settings/emailIngestion/emailIngestionApp.js',
      'resources/javascripts/components/settings/emailIngestion//emailIngestionAppTmpl.html',
      'develop/app/components/settings/emailIngestion/emailIngestionAppTest.html',
      'develop/test/components/settings/emailIngestion/emailIngestionApp-unitTest.js',
      'develop/test/components/settings/emailIngestion/emailIngestionApp-endToEndTest.js'
    ]);
  });
});
