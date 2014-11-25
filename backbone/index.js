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

var TinyGenerator = yeoman.generators.NamedBase.extend({
    initializing: function () {
        this.log('You called the tiny subgenerator with the argument ' + this.name + '.');

        this.jsTemplate = handlebars.compile(this.read("tiny_template_js"));
        this.htmlTemplate = handlebars.compile(this.read("tiny_template_html"));
    },
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the kickass Tiny generator!'
        ));

        var prompts = [
            {
                type: 'input',
                name: 'rootPath',
                message: 'The root path that you place defined js.',
                default: this.destinationRoot()
            }
        ];

        this.prompt(prompts, function (props) {
            var rootPath = props.rootPath;
            if(rootPath !== this.destinationRoot()){
                rootPath = path.relative(this.destinationRoot(),rootPath);
            }
            this.destinationRoot(rootPath);

            /**
             * build javascript file
             */
            var definePath = "views/" + this.name;
            this.javascriptFilePath ="javascripts" + path.sep + definePath + ".js";
            //if not pass the definedAppName, then get it from definePath
            var definedAppName = "";
            var appName = definePath.match(/[^\/]+$/);
            if(appName === null){
                definedAppName = definePath;
            }else{
                definedAppName = appName[0];
            }
            /**
             * build template file
             */
            //parse the template path
            var templateFilePath = this.templateFilePath = "tmpl" + path.sep + this.name+"Tmpl.html";
            //if the template path is not end with .html, then append it.
            var templateDomIds = "";
            //if not pass templateDomIds then get it from the template path.
            if(!templateDomIds){
                var templateName = templateFilePath.match(/[^\/]+\.html$/);
                if(templateName === null){
                    templateName = templateFilePath;
                }
                templateDomIds = [templateName[0].substring(0,templateName[0].length-5)];
            }else{
                templateDomIds = templateDomIds.split(",");
            }
            var tid = ("_"+Math.random()).replace(".","");
            for(var l = templateDomIds.length-1;l>-1;l--){
                templateDomIds[l] = {
                    originalId : templateDomIds[l],
                    uniqueId:templateDomIds[l] + tid //add tid to avoid create multiple id.
                }
            }

            this.templateData = {
                definePath : definePath,
                definedAppName:definedAppName,
                templatePath : templateFilePath,
                templateDomIds : templateDomIds
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
