/**
 * @author Damon Liu
 * @date 2014-11-25
 */
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var handlebars = require('handlebars');

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
                name: 'definePath',
                message: 'The file path that you place defined js.',
                default: "scripts/view/test.js"
            },
            {
                type: 'input',
                name: 'definedAppName',
                message: 'The defined js file has a appName. The default value is the js file name that get from definePath',
                default: ""
            },
            {
                type: 'input',
                name: 'templatePath',
                message: 'The file path that you place template js.',
                default: "scripts/views/test.html"
            },
            {
                type: 'input',
                name: 'templateDomIds',
                message: 'Generate the script chunk by template ids, the default value is the template file name that get from templatePath',
                default: ""
            }
        ];

        this.prompt(prompts, function (props) {
            var definePath = props.definePath;
            if(/\.js$/.test(definePath)){
                definePath = definePath.substring(0,definePath.length-3);
            }
            //if not pass the definedAppName, then get it from definePath

            if(!props.definedAppName){
//                console.log(definePath);
                var appName = definePath.match(/[^\/]+$/);
                if(appName === null){
                    props.definedAppName = definePath;
                }else{
                    props.definedAppName = appName[0];
                }

            }
            //parse the template path
            var templatePath = props.templatePath;
            //if the template path is not end with .html, then append it.
            if(!/\.html$/.test(templatePath)){
                templatePath = templatePath + ".html"
            }
            var templateDomIds = props.templateDomIds;
            //if not pass templateDomIds then get it from the template path.
            if(!templateDomIds){
                var templateName = templatePath.match(/[^\/]+\.html$/);
                if(templateName === null){
                    templateName = templatePath;
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
                definedAppName:props.definedAppName,
                templatePath : templatePath,
                templateDomIds : templateDomIds
            };
            done();
        }.bind(this));
    },
    writing: function () {
        var jsFileContent = this.jsTemplate(this.templateData);
        var htmlFileContent = this.htmlTemplate(this.templateData);
        this.write(this.templateData.definePath+".js",jsFileContent);
        this.write(this.templateData.templatePath,htmlFileContent);
    }
});

module.exports = TinyGenerator;
