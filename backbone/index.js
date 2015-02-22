/**
 * @author Damon Liu
 * @date 2014-11-25
 */
'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var handlebars = require('handlebars');
var path = require('path');
var rimraf = require('rimraf');
var MODULE_TYPE = 'standard';
var MATCH_NAME = /([\w\-]+)(\.js)?$/;
var MATCH_TEPLATE_NAMES = /^([,\w\-]+)$/;
var defaultMethod = new (require('./methods/default'));
var deleteMethod = new (require('./methods/delete'));
var testonlyMethod = new (require('./methods/testonly'));

var TinyGenerator = yeoman.generators.NamedBase.extend({
  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.option('delete');
    this.option('testonly');
  },
  initializing: function () {
    //extract the file name from passed argument.
    var name = this.name;
    if (!MATCH_NAME.test(name)) {
      this.error("argument is illegal! please pass the argument like this: [path]fileName[.js], and file name must be [a-zA-Z0-9_-]");
      return;
    }
    this.fileDirPath = path.dirname(name);
    var baseFileName = path.basename(name, '.js');
    if (!/App$/.test(baseFileName)) {
      baseFileName = baseFileName + 'App';
    }
    this.baseFileName = baseFileName;
    if (this.options.delete) {
      return deleteMethod.initializing.apply(this);
    } else if (this.options.testonly) {
      testonlyMethod.initializing.apply(this);
    } else {
      defaultMethod.initializing.apply(this);
      testonlyMethod.initializing.apply(this);
    }
  },
  prompting: function () {
    var done = this.async();
//        Have Yeoman greet the user.
//        this.log(yosay(
//            'Welcome to the kickass Tiny generator!'
//        ));
    var prompts = defaultMethod.buildPrompts.apply(this);
    if (this.options.delete) {
      prompts = deleteMethod.buildPrompts.apply(this);
    }
    if (this.options.testonly) {
      prompts = testonlyMethod.buildPrompts.apply(this);
    }
    this.prompt(prompts, function (props) {
      var resourcesPath = props.resourcesPath;
      if (resourcesPath && resourcesPath !== this.destinationRoot()) {
        resourcesPath = path.relative(this.destinationRoot(), resourcesPath);
        this.resourcesPath = resourcesPath;
      }
      var testingPath = props.testingPath;
      if (testingPath && testingPath !== this.destinationRoot()) {
        testingPath = path.relative(this.destinationRoot(), testingPath);
        this.testingPath = testingPath;
      }

      this.definedName = "views" + path.sep + this.fileDirPath + path.sep + this.baseFileName;

      if (this.options.delete) {
        deleteMethod.promptProcess.apply(this,[props]);
      } else if (this.options.testonly) {
        testonlyMethod.promptProcess.apply(this, [props]);
      } else {
        defaultMethod.promptProcess.apply(this, [props]);
        //process testing files
        testonlyMethod.promptProcess.apply(this, [props]);
      }
      done();
    }.bind(this));
  },
  writing: function () {
    if (this.options.delete) {
      //deleteMethod.writting.apply(this);
    } else if (this.options.testonly) {
      testonlyMethod.writing.apply(this);
    } else {
      defaultMethod.writing.apply(this);
      testonlyMethod.writing.apply(this);
    }
  }
});


module.exports = TinyGenerator;
