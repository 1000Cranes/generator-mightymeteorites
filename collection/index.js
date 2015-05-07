'use strict';
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var path = require('path');
var util = require('util');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.option('ironRouter');
    
    this.name = _s(this.name).slugify().camelize().toLowerCase().value();
    this.sourceRoot(path.join(__dirname, '../app/templates'));
  },

  writing: function () {
    var collectionName = _s(this.name).capitalize().value();
      this.fs.copyTpl(
        this.templatePath('collections/collection.js'),
        this.destinationPath('collections/'+this.name+'.js'),
        { collectionName: collectionName, collection: this.name }
      );
      this.fs.copyTpl(
        this.templatePath('server/publications/collection.js'),
        this.destinationPath('server/publications/'+this.name+'.js'),
        { collectionName: collectionName, collection: this.name }
      );
      this.fs.copyTpl(
        this.templatePath('client/subscriptions/collection.js'),
        this.destinationPath('client/subscriptions/'+this.name+'.js'),
        { collection: this.name }
      );
      this.fs.copyTpl(
        this.templatePath('client/views/collection/template.html'),
        this.destinationPath('client/views/'+this.name+'/template.html'),
        { collection: this.name }
      );
      this.fs.copy(
        this.templatePath('client/views/collection/events.js'),
        this.destinationPath('client/views/'+this.name+'/events.js')
      );
      this.fs.copy(
        this.templatePath('client/views/collection/helpers.js'),
        this.destinationPath('client/views/'+this.name+'/helpers.js')
      );
      this.fs.copy(
        this.templatePath('client/views/collection/rendered.js'),
        this.destinationPath('client/views/'+this.name+'/rendered.js')
      );
      if(this.options.ironRouter){
        this.fs.copyTpl(
            this.templatePath('client/views/collection/routers.js'),
            this.destinationPath('client/views/'+this.name+'/routers.js'),
          { collection: this.name }
        );
      }
  }
});
