/**
 * Created by mike on 28/7/2015.
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
var sep = path.sep;
var methods = {
  initializing:function(){
    var baseFileName = this.baseFileName;
    this.jsTemplate = handlebars.compile(this.read("react_main_jsx"));
   // this.htmlTemplate = handlebars.compile(this.read("template_html"));
  },
  buildPrompts:function(){
    return [
      {
        type: 'input',
        name: 'resourcesPath',
        message: 'The resources path that you place javascript and template files.',
        store: true,
        default: './resources'
      },
      {
        type: 'list',
        name: 'moduleType',
        message: 'The type of app module',
        choices: ['standard'],
        default: MODULE_TYPE
      },
/*      {
        type: 'confirm',
        name: 'formValidation',
        message: 'Would you like add form validation?',
        default: false
      },*/
      {
        type: 'input',
        name: 'templateScriptNames',
        message: 'Do you want to create more then one script template name, if do join the name with ,'
      },
      {
        type: 'input',
        name: 'testingPath',
        message: 'The root path that you place the files that for your testing.',
        default: './develop'
      }
    ];
  },
  buildFilesPath:function(){
    this.javascriptFilePath = "javascripts" + sep + this.definedName + ".js";
   // this.primaryTemplateName = this.baseFileName + 'Tmpl';
   // this.templateFilePath = "tmpl" + sep + this.fileDirPath + sep + this.primaryTemplateName + ".html";
    this.log(chalk.blue('absoluteJavascriptFilePath: %s %s'),this.resourcesPath,this.javascriptFilePath);
    this.absoluteJavascriptFilePath = this.resourcesPath + path.sep + this.javascriptFilePath;
    //this.absoluteTemplateFilePath = this.resourcesPath + path.sep + this.templateFilePath;
  },
  promptProcess:function(props){
    methods.buildFilesPath.apply(this);
    //if the template path is not end with .html, then append it.
    /*var templateScriptNames = [this.primaryTemplateName];
    if (props.templateScriptNames) {
      if (!MATCH_TEPLATE_NAMES.test(props.templateScriptNames)) {
        this.error("Template names argument is illegal! please pass the argument like this: [a-zA-Z0-9_-],[a-zA-Z0-9_-]");
      }
      templateScriptNames = templateScriptNames.concat(props.templateScriptNames.split(","));
    }
    if (templateScriptNames.length) {
      var tid = new Date().getTime();
      for (var l = templateScriptNames.length - 1; l > -1; l--) {
        var templateName = templateScriptNames[l].trim();
        templateScriptNames[l] = {
          templateName: templateName,
          templateId: templateName + (tid++) //add tid to avoid create multiple id.
        }
      }
    }*/

    this.templateData = {
     // isDialog: props.moduleType == 'dialog' || props.moduleType == 'dialog-grid',
     // isGrid: props.moduleType == 'grid' || props.moduleType == 'dialog-grid',
    //  isFormValidation: props.formValidation,
      definedName: this.definedName,
      appVarName: this.baseFileName,
    //  templatePath: this.templateFilePath,
     // templateScriptNames: templateScriptNames,
    //  templateScriptNamesJsonStr: JSON.stringify(templateScriptNames),
      model: true
    };
  },
  writing:function(){
    var jsFileContent = this.jsTemplate(this.templateData);
   // var htmlFileContent = this.htmlTemplate(this.templateData);
    this.log(chalk.blue('writing jsFileContent: %s'),this.absoluteJavascriptFilePath);
    this.log(chalk.blue('writing absoluteJavascriptFilePath: %s'),this.destinationRoot()+path.sep+this.absoluteJavascriptFilePath);

    this.write(this.destinationRoot()+path.sep+this.absoluteJavascriptFilePath, jsFileContent);
  }
};
var defaultMethod = function(){};
for(var key in methods){
  if(methods.hasOwnProperty(key)){
    defaultMethod.prototype[key] = methods[key];
  }
}
module.exports = defaultMethod;
