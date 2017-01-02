/**
 * @author Damon Liu
 * @date 2014-11-25
 */

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var TinyGenerator = yeoman.generators.Base.extend({

    prompting: function () {
        var done = this.async();

       // Have Yeoman greet the user.
       this.log(yosay(
           'Welcome to the kickass Tiny generator!'
       ));

       var prompts = [
           {
               name: 'name',
               message: 'Hey there what\'s your name?',
               default: "John Doe"
           },{
                type: 'checkbox',
                name: 'checks',
                message: 'Which of these would you like?',
                choices: [
                    {
                        name: "ThisThing",
                        checked: true
                    },{
                        name: "ThatThing",
                        checked: false
                    },{
                        name: "OtherThing",
                        checked: false
                    }

                ]
           },{
                name:    "best",
                type:    "list",
                message: "Which of these is your favorite?",
                choices: [ "dogs", "cats", "rats", "snakes" ],
                default: "snakes"
           }
       ];

       this.prompt(prompts, function (props) {
           this.props = props;

           done();
       }.bind(this));

    },

    writing: function(){
        var done = this.async();
        // console.log(this.props);

        var str = "Your name is "+this.props.name + " and you like:\n";

        this.props.checks.forEach(function(check){
            str += " - "+check+"\n";
        });

        str += "...and your favorite animal is "+this.props.best;

        console.log("\n\n===================================");
        console.log(str)
        console.log("===================================\n\n");

        done();
    }
});

module.exports = TinyGenerator;
