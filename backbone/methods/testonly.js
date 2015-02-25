/**
 * Created by damon on 2/22/15.
 */
'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var handlebars = require('handlebars');
var path = require('path');
var rimraf = require('rimraf');
var open = require('open');
var MODULE_TYPE = 'standard';
var MATCH_NAME = /([\w\-]+)(\.js)?$/;
var MATCH_TEPLATE_NAMES = /^([,\w\-]+)$/;
var sep = path.sep;

var methods = {
  initializing:function(){
    var baseFileName = this.baseFileName;
    this.log(chalk.green.bold('You are creating the files: ' + [baseFileName+".js",baseFileName+"Tmpl.html"].join(',')));
    this.developAppHtmlTemplate = handlebars.compile(this.read('develop/app/develop_app_html'));
    this.endToEndTestTemplate = handlebars.compile(this.read('develop/test/endToEndTest/endToEnd_js'));
    this.unitTestTemplate = handlebars.compile(this.read('develop/test/unitTest/unitTest_js'));
  },
  buildPrompts:function(){
    return [
      {
        type: 'input',
        name: 'testingPath',
        message: 'The root path that you place the files that for your testing.',
        default: this.destinationRoot()
      }
    ];
  },
  buildFilesPath:function(){
    this.unitTestPath = "test" + sep + this.fileDirPath + sep + this.baseFileName + "-unitTest.js";
    this.endToEndTestPath = "test" + sep + this.fileDirPath + sep + this.baseFileName + "-endToEndTest.js";
    this.developTestHtmlPath = "app" + sep + this.fileDirPath + sep + this.baseFileName + "Test.html";
    this.absoluteUnitTestPath = this.testingPath + sep + this.unitTestPath;
    this.absoluteEndToEndTestHtmlPath = this.testingPath + sep + this.endToEndTestPath;
    this.absoluteDevelopTestHtmlPath = this.testingPath + sep + this.developTestHtmlPath;
  },
  promptProcess:function(props){
    methods.buildFilesPath.apply(this);
    var requireToolsRelativePath = path.relative('/app/' + this.fileDirPath,'/tools');
    this.developTestModelData = {
      definedName:this.definedName,
      appVarName:this.baseFileName, //unitTestPath used
      containerId:this.baseFileName + "Container", //used by develop_app_html
      fileDirPath: this.fileDirPath,
      developAppHtmlPath : this.fileDirPath + sep + this.baseFileName + "Test.html",//used by endToEnd_js
      requireToolsRelativePath :requireToolsRelativePath
    }
  },
  writing:function(){
    this.write(this.absoluteDevelopTestHtmlPath, this.developAppHtmlTemplate(this.developTestModelData));
    this.write(this.absoluteUnitTestPath, this.unitTestTemplate(this.developTestModelData));
    this.write(this.absoluteEndToEndTestHtmlPath, this.endToEndTestTemplate(this.developTestModelData));

    var url = 'http://localhost:9000/' + this.fileDirPath + sep + this.baseFileName + 'Test.html';
    this.log(chalk.blue.bgYellow('Please add blow url to the associate module of develop index.html : '));
    this.log(chalk.blue.bold.bgYellow(url));
    this.log(chalk.black.bold.bgCyan('And make sure the html files could be found by tiny_layout task!'))
    //open(url,function(){});
  }
};
var testOnlyMethod = function(){};
for(var key in methods){
  if(methods.hasOwnProperty(key)){
    testOnlyMethod.prototype[key] = methods[key];
  }
}
module.exports = testOnlyMethod;
