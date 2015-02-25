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
  },
  buildPrompts:function(){
    return [{
      type: 'input',
      name: 'resourcesPath',
      message: 'The resources path that you process files?',
      store: true,
      default: './resources'
    },{
      type: 'confirm',
      name: 'delete',
      message: 'Are you confirm to delete the files',
      default: false
    },{
      type: 'input',
      name: 'testingPath',
      message: 'If you want to delete the associated testing files please input the path, current path please input [./]',
      default: './develop'
    }];
  },
  promptProcess:function(props){
    var isDelete = this.isDelete = props.delete;
    this.testingPath = props.testingPath;
    if(!isDelete){
      process.exit();
    }
  },
  writting:function(){
    defaultMethod.buildFilesPath.apply(this);
    rimraf(this.absoluteJavascriptFilePath,function(){});
    rimraf(this.absoluteTemplateFilePath,function(){});
    if(this.testingPath){
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
