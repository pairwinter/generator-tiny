'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var MATCH_NAME = /([\w\-]+)(\.js)?$/;
var defaultMethod = new (require('./methods/default'));
var deleteMethod = new (require('./methods/delete'));
var testonlyMethod = new (require('./methods/testonly'));

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
    this.option('delete');
    this.option('testonly');
  },
  initializing: function () {
    this.log(chalk.blue.bgCyan.bold('Current work path : ' + this.destinationRoot()));
    //extract the file name from passed argument.
    var name = this.appname;
    console.log(chalk.blue('name: %s'),this.appname);
    if (!MATCH_NAME.test(name)) {
      this.error("argument is illegal! please pass the argument like this: [path]fileName[.js], and file name must be [a-zA-Z0-9_-]");
      return;
    }
    this.fileDirPath = path.dirname(name);
    this.log(chalk.blue('fileDirPath: %s'),this.fileDirPath);
    var baseFileName = path.basename(name, '.js');
    this.log(chalk.blue('baseFileName: %s'),baseFileName);
    if (!/App$/.test(baseFileName)) {
      baseFileName = baseFileName + 'App';
    }
    this.baseFileName = baseFileName;
    this.log(chalk.blue('baseFileNameApp: %s'),baseFileName);
    if (this.options.delete) {
      this.log(chalk.blue('this.options.delete: %s'),this.options.delete);
      return deleteMethod.initializing.apply(this);
    } else if (this.options.testonly) {
      this.log(chalk.blue('this.options.testonly: %s'),this.options.testonly);
      testonlyMethod.initializing.apply(this);
    } else {
      this.log(chalk.blue('this.options.default: %s'),'default');
      defaultMethod.initializing.apply(this);
      testonlyMethod.initializing.apply(this);
    }
  },
  prompting: function () {
    var done = this.async();
//        Have Yeoman greet the user.
    /*this.log(yosay(
      'Welcome to the kickass Tiny generator!'
    ));*/
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
        this.log(chalk.blue('prompt destinationRoot: %s'),this.destinationRoot());
        this.log(chalk.blue('prompt resourcesPath: %s'),resourcesPath);
        resourcesPath = path.relative(this.destinationRoot(), resourcesPath);
        this.log(chalk.blue('prompt resourcesPath2: %s'),resourcesPath);
        this.resourcesPath = resourcesPath;
      }
      var testingPath = props.testingPath;
      if (testingPath && testingPath !== this.destinationRoot()) {
        this.log(chalk.blue('prompt testingPath: %s'),testingPath);
        testingPath = path.relative(this.destinationRoot(), testingPath);
        this.log(chalk.blue('prompt testingPath2: %s'),testingPath);
        this.testingPath = testingPath;
      }

      this.definedName = "views" + path.sep + this.fileDirPath + path.sep + this.baseFileName;
      this.log(chalk.blue('prompt definedName: %s'),testingPath);
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
      deleteMethod.writting.apply(this);
    } else if (this.options.testonly) {
      testonlyMethod.writing.apply(this);
    } else {
      defaultMethod.writing.apply(this);
      testonlyMethod.writing.apply(this);
    }
  },

  install: function () {
    this.installDependencies();
  },
  end:function(){
    this.log('Congratulations!End!');
  }
});
