/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('tiny:backbone', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../backbone'))
            .inDir(path.join(os.tmpdir(), './temp-test/generator'))
            .withArguments('settings/emailIngestion --delete')
            .withPrompts({
                rootPath:"../newfolder",
                delete:true
            })
            .on('end', done);
    });

    it('delete files', function () {
        assert.noFile([
            'javascripts/views/settings/emailIngestionApp.js',
            'tmpl/settings/emailIngestionAppTmpl.html'
        ]);
    });
});
