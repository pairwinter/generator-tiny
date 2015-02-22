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
var MODULE_TYPE = 'standard';
var MATCH_NAME = /([\w\-]+)(\.js)?$/;
var MATCH_TEPLATE_NAMES = /^([,\w\-]+)$/;
var defaultMethod = new (require('./default'));
var testonlyMethod = new (require('./testonly'));
var methods = {
  initializing:function(){
    var baseFileName = this.baseFileName;
    this.log(chalk.blue.bold('You are deleting the files: ' + [baseFileName+".js",baseFileName+"Tmpl.html"].join(',')));
  },
  buildPrompts:function(){
    return [{
      type: 'input',
      name: 'resourcesPath',
      message: 'The resources path that you process files?',
      store: true,
      default: this.destinationRoot()
    },{
      type: 'confirm',
      name: 'delete',
      message: 'Are you confirm to delete the files',
      default: false
    },{
      type: 'confirm',
      name: 'deleteTesting',
      message: 'Do you want to delete the associated testing files?',
      default: false
    }];
  },
  promptProcess:function(props){
    var isDelete = this.isDelete = props.delete;
    var isDeleteTesting = this.isDeleteTesting = props.deleteTesting;
    if(!isDelete){
      process.exit();
    }
  },
  writting:function(){
    defaultMethod.buildFilesPath.apply(this);
    rimraf(this.absoluteJavascriptFilePath,function(){});
    rimraf(this.absoluteTemplateFilePath,function(){});
    this.log(this.isDeleteTesting);
    if(this.isDeleteTesting){
      testonlyMethod.buildFilesPath.apply(this);
      rimraf(this.absoluteDevelopTestHtmlPath,function(){});
      rimraf(this.absoluteUnitTestPath,function(){});
      rimraf(this.absoluteEndToEndTestHtmlPath,function(){});
    }
  }
};
var deleteMethod = function(){};
for(var key in methods){
  if(methods.hasOwnProperty(key)){
    deleteMethod.prototype[key] = methods[key];
  }
}
module.exports = deleteMethod;
