'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.packages = [
      'standard-app-packages'
    ];
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sublime ' + chalk.red('Mightymeteorites') + ' generator!'
    ));

    var prompts = [
      {
      type: 'input',
      name: 'collectionName',
      message: 'Starting collection:',
      default: this.appname
    },
      {
      type: 'confirm',
      name: 'ironRouter',
      message: 'Would you like Iron Router?',
      default: true
    },
    {
      type: 'input',
      name: 'ui',
      message: 'Would you like Bootstrap (B) or Materialize (M)?',
      default: 'M'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.collectionName = _s(this.props.collectionName).slugify().camelize().toLowerCase().value();
      this.materialize = false;
      this.bootstrap = false;
      if(_s(this.props.ui).toLowerCase().value() == "m")
        this.materialize = true;
      else
        this.bootstrap = true;
      
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('.meteor/gitignore'),
        this.destinationPath('.meteor/gitignore')
      );
      this.fs.copy(
        this.templatePath('.meteor/release'),
        this.destinationPath('.meteor/release')
      );
      this.fs.copy(
        this.templatePath('server/startup.js'),
        this.destinationPath('server/startup.js')
      );
      this.fs.copy(
        this.templatePath('public/robots.txt'),
        this.destinationPath('public/robots.txt')
      );
    },
    
    collectionfiles: function () {
      var collectionName = _s(this.props.collectionName).capitalize().value();
      this.fs.copyTpl(
        this.templatePath('collections/collection.js'),
        this.destinationPath('collections/'+this.props.collectionName+'.js'),
        { collectionName: collectionName, collection: this.props.collectionName }
      );
      this.fs.copyTpl(
        this.templatePath('server/publications/collection.js'),
        this.destinationPath('server/publications/'+this.props.collectionName+'.js'),
        { collectionName: collectionName, collection: this.props.collectionName }
      );
      this.fs.copyTpl(
        this.templatePath('client/subscriptions/collection.js'),
        this.destinationPath('client/subscriptions/'+this.props.collectionName+'.js'),
        { collection: this.props.collectionName }
      );
      this.fs.copyTpl(
        this.templatePath('client/views/collection/template.html'),
        this.destinationPath('client/views/'+this.props.collectionName+'/template.html'),
        { collection: this.props.collectionName }
      );
      this.fs.copy(
        this.templatePath('client/views/collection/events.js'),
        this.destinationPath('client/views/'+this.props.collectionName+'/events.js')
      );
      this.fs.copy(
        this.templatePath('client/views/collection/helpers.js'),
        this.destinationPath('client/views/'+this.props.collectionName+'/helpers.js')
      );
      this.fs.copy(
        this.templatePath('client/views/collection/rendered.js'),
        this.destinationPath('client/views/'+this.props.collectionName+'/rendered.js')
      );
      if(this.props.ironRouter){
        this.fs.copyTpl(
            this.templatePath('client/views/collection/routers.js'),
            this.destinationPath('client/views/'+this.props.collectionName+'/routers.js'),
          { collection: this.props.collectionName }
        );
      }
    },
    
    bootstrapfiles: function () {
      if(this.bootstrap)
      {
        this.fs.copy(
          this.templatePath('client/views/bootstrap_base/header.html'),
          this.destinationPath('client/views/base/header.html')
        );
        this.fs.copy(
          this.templatePath('client/views/bootstrap_base/sidebar.html'),
          this.destinationPath('client/views/base/sidebar.html')
        );
        this.fs.copy(
          this.templatePath('client/views/bootstrap_base/startup.js'),
          this.destinationPath('client/views/base/startup.js')
        );
        this.fs.copy(
          this.templatePath('client/views/bootstrap_base/style.css'),
          this.destinationPath('client/views/base/style.css')
        );
        if(this.props.ironRouter)
        {
          this.fs.copyTpl(
            this.templatePath('client/views/bootstrap_template/layout.html'),
            this.destinationPath('client/views/template/layout.html'),
            { yield: '{{> yield}}' }
          );
          this.fs.copy(
            this.templatePath('client/views/bootstrap_template/loading.html'),
            this.destinationPath('client/views/template/loading.html')
          );
          this.fs.copy(
            this.templatePath('client/views/bootstrap_template/not_found.html'),
            this.destinationPath('client/views/template/not_found.html')
          );
          this.fs.copyTpl(
            this.templatePath('client/views/bootstrap_template/router.js'),
            this.destinationPath('client/views/template/router.js'),
            { collection : this.props.collectionName }
          );
        }
        else 
        {
          this.fs.copy(
            this.templatePath('client/views/bootstrap_base/template.html'),
            this.destinationPath('client/views/base/template.html')
          );
        }
      }
    },
    
    materializefiles: function () {
      if(this.materialize)
      {
        this.fs.copy(
          this.templatePath('client/views/materialize_base/footer.html'),
          this.destinationPath('client/views/base/footer.html')
        );
        this.fs.copy(
          this.templatePath('client/views/materialize_base/header.html'),
          this.destinationPath('client/views/base/header.html')
        );
        this.fs.copy(
          this.templatePath('client/views/materialize_base/sidebar.html'),
          this.destinationPath('client/views/base/sidebar.html')
        );
        this.fs.copy(
          this.templatePath('client/views/materialize_base/rendered.js'),
          this.destinationPath('client/views/base/rendered.js')
        );
        this.fs.copy(
          this.templatePath('client/views/materialize_base/style.css'),
          this.destinationPath('client/views/base/style.css')
        );
        if(this.props.ironRouter)
        {
          this.fs.copyTpl(
            this.templatePath('client/views/materialize_template/layout.html'),
            this.destinationPath('client/views/template/layout.html'),
            { yield: '{{> yield}}' }
          );
          this.fs.copy(
            this.templatePath('client/views/materialize_template/loading.html'),
            this.destinationPath('client/views/template/loading.html')
          );
          this.fs.copy(
            this.templatePath('client/views/materialize_template/not_found.html'),
            this.destinationPath('client/views/template/not_found.html')
          );
          this.fs.copyTpl(
            this.templatePath('client/views/materialize_template/router.js'),
            this.destinationPath('client/views/template/router.js'),
            { collection : this.props.collectionName }
          );
        }
        else 
        {
          this.fs.copy(
            this.templatePath('client/views/materialize_base/template.html'),
            this.destinationPath('client/views/base/template.html')
          );
        }
      }
    }
  },
  
  addRouter: function() {
    if(this.props.ironRouter)
    {
      this.packages.push('iron:router');
      this.packages.push('sacha:spin');
    }
  },
  
  addBootstrap: function() {
    if(this.bootstrap)
    {
      this.packages.push('twbs:bootstrap'); 
    }
  },
  
  addMaterialize: function() {
    if(this.materialize)
    {
      this.packages.push('materialize:materialize'); 
    }
  },

  install: function () {
    this.write('.meteor/packages', this.packages.join('\n'));
    this.spawnCommand('meteor', ['update']);
  }
});
