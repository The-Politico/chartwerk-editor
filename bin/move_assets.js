#! /usr/bin/env node

const inquirer = require('inquirer');
const vfs = require('vinyl-fs');

const questions = [{
  name: 'unbundleOpt',
  message: 'Which scheme would you like to use to unbundle chartwerk-editor\'s assets?',
  type: 'list',
  choices: [{
    name: 'Django staticapp (see http://github.com/dallasmorningnews/)',
    value: 'django',
  }, {
    name: 'Root dist/ directory',
    value: 'dist',
  }],
}];

inquirer.prompt(questions).then((answers) => {
  if (answers.unbundleOpt === 'django') {
    vfs.src('./dist/js/**/*.js').pipe(vfs.dest('./../../../static/chartwerk/js'));
    vfs.src('./dist/**/*.json').pipe(vfs.dest('./../../../static/chartwerk/js'));
    vfs.src('./dist/css/**/*.css').pipe(vfs.dest('./../../../static/chartwerk/css'));
    vfs.src('./dist/img/**/*').pipe(vfs.dest('./../../../static/chartwerk/img'));
    vfs.src('./dist/fonts/**/*').pipe(vfs.dest('./../../../static/chartwerk/fonts'));
    vfs.src(['./src/templates/**/*.html', '!./**/index.html'])
      .pipe(vfs.dest('./../../../templates/chartwerk'));
  } else if (answers.unbundleOpt === 'dist') {
    vfs.src('./dist/**/*').pipe(vfs.dest('./../../dist/'));
  }
});
