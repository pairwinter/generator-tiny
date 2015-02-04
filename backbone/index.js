/**
 * @author Damon Liu
 * @date 2014-11-25
 */
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var handlebars = require('handlebars');
var path = require('path');
var MODULE_TYPE='standard';
var MATCH_NAME=/([\w\-]+)(\.js)?$/;
var MATCH_TEPLATE_NAMES=/^([\,\w\-]+)$/;
var TinyGenerator = yeoman.generators.NamedBase.extend({

    initializing: function () {
        //extract the file name from passed argument.
        var name = this.name;
        if(!MATCH_NAME.test(name)){
            this.error("argument is illegal! please pass the argument like this: [path]fileName[.js], and file name must be [a-zA-Z0-9_-]");
            return;
        }
        this.fileDirPath = path.dirname(name);
        var baseFileName = path.basename(name,'.js');
        this.log('You called the tiny:backbone with the argument ' + this.name + '.');
        this.log('Will create app and template with the name: '+ baseFileName);
        if(!/App$/.test(baseFileName)){
            baseFileName = baseFileName + 'App';
        }
        this.baseFileName = baseFileName;
        this.jsTemplate = handlebars.compile(this.read("template_js"));
        this.htmlTemplate = handlebars.compile(this.read("template_html"));

    },
    prompting: function () {
        var done = this.async();
//        Have Yeoman greet the user.
//        this.log(yosay(
//            'Welcome to the kickass Tiny generator!'
//        ));
        var prompts = [
            {
                type: 'input',
                name: 'rootPath',
                message: 'The root path that you place javascript and template files.',
                store:true,
                default: this.destinationRoot()
            },
            {
                type: 'list',
                name: 'moduleType',
                message: 'The type of app module',
                choices:['standard','dialog','grid','dialog-grid'],
                default:MODULE_TYPE
            },
            {
                type: 'input',
                name: 'templateScriptNames',
                message: 'Do you want to create more then one script template name, if do join the name with [,]',
                default:""
            }
        ];

        this.prompt(prompts, function (props) {
            var rootPath = props.rootPath;
            if(rootPath !== this.destinationRoot()){
                rootPath = path.relative(this.destinationRoot(),rootPath);
            }
            this.destinationRoot(rootPath);
            var definedName = "javascripts"+path.sep+"views" + path.sep + this.fileDirPath + path.sep + this.baseFileName;
            this.javascriptFilePath =definedName + ".js";
            var primaryTemplateName = this.baseFileName + 'Tmpl';
            this.templateFilePath = "tmpl" + path.sep + this.fileDirPath + path.sep + primaryTemplateName + ".html";
            //if the template path is not end with .html, then append it.
            var templateScriptNames = [primaryTemplateName];
            if(props.templateScriptNames){
                if(!MATCH_TEPLATE_NAMES.test(props.templateScriptNames)){
                    this.error("Template names argument is illegal! please pass the argument like this: [a-zA-Z0-9_-],[a-zA-Z0-9_-]");
                }
                templateScriptNames = templateScriptNames.concat(props.templateScriptNames.split(","));
            }
            if(templateScriptNames.length){
                var tid = new Date().getTime();
                for(var l = templateScriptNames.length-1;l>-1;l--){
                    var templateName = templateScriptNames[l].trim();
                    templateScriptNames[l] = {
                        templateName : templateName,
                        templateId:templateName + (tid++) //add tid to avoid create multiple id.
                    }
                }
            }

            this.templateData = {
                isDialog:props.moduleType == 'dialog' || props.moduleType=='dialog-grid',
                isGrid:props.moduleType == 'grid' || props.moduleType=='dialog-grid',
                definedName : definedName,
                appVarName:this.baseFileName,
                templatePath : this.templateFilePath,
                templateScriptNames : templateScriptNames,
                templateScriptNamesJsonStr : JSON.stringify(templateScriptNames),
                model:true
            };
            done();
        }.bind(this));
    },
    writing: function () {
        var jsFileContent = this.jsTemplate(this.templateData);
        var htmlFileContent = this.htmlTemplate(this.templateData);
        this.write(this.javascriptFilePath,jsFileContent);
        this.write(this.templateFilePath,htmlFileContent);
    }
});

module.exports = TinyGenerator;
