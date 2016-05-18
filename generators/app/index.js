'use strict';
var yeoman = require('yeoman-generator').Base;
var chalk = require('chalk');
var Constants = require("./constants.json");

module.exports = yeoman.extend({
  initializing: function() {
    console.log('\n');
    console.log('Welcome to the ' + chalk.green('React Flux Generator') + ' generator! The project will be install to this folder.');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: Constants['package']['name'],
        message: 'Please enter the name of the project ...',
        default: this.env.cwd.split('/')[this.env.cwd.split('/').length - 1]
      },
      {
        type: 'input',
        name: Constants['package']['version'],
        message: 'Please enter the version of the project ...',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: Constants['package']['id'],
        message: 'Please enter the project ID ...',
        default: 'com.default.project'
      },
      {
        type: 'list',
        name: Constants['package']['dependencies'],
        message: 'Please choose a list of modules ...',
        choices: [
          {
            value: 'default',
            name: 'default (start kit(flux, lodash etc.))'
          }, {
            value: 'custom',
            name: 'custom (whithout dependencies)'
          }
        ]
      }];

      this.prompt(prompts, function (props) {
        this.props = props;
        this.props.tempPath = this.templatePath();
        this.props.destPath = this.destinationPath();
        done();
      }.bind(this));
    },

    configuring: function() {
      this.config.set('props', this.props);
      this.config.set('files', Constants.files);
      this.config.set('dependencies', Constants.mode);
    },

    writing: function () {
      var self = this;
      this.config.get('files').forEach(function(file) {
        if(file[2])
          self.fs.copyTpl(self.templatePath(file[0]), self.destinationPath(file[1]), { props: self.props });
        else
          self.fs.copy(self.templatePath(file[0]), self.destinationPath(file[1]));
      });
    },

    npm: function() {
      this.npmInstall(Constants.mode[this.config.get('props')['dependencies']]['prod'], { 'save' : true });
      this.npmInstall(Constants.mode[this.config.get('props')['dependencies']]['dev'],  { 'saveDev': true });
    },

    install: function () {
      this.installDependencies();
    }
  });
