'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var Handlebars = require('handlebars');

var TinyGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the tiny subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {

    this.src.copy('somefile.js', 'somefile.js');
  }
});

module.exports = TinyGenerator;
