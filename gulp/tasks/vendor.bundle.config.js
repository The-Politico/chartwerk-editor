module.exports = {
  bundle: {
    'js/vendor': {
      scripts: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/ckeditor/ckeditor.js',
        './bower_components/zeroclipboard/dist/ZeroClipboard.min.js',
        './node_modules/alpaca/dist/alpaca/bootstrap/alpaca.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/bootstrap-table/dist/bootstrap-table.min.js',
        './bower_components/typed.js/dist/typed.min.js',
        './bower_components/jquery-simplecolorpicker/jquery-simplecolorpicker.js'
      ],
      options: {
        uglify: false,
        rev: false,
        order: {
            scripts: [
                '**/jquery.min.js',
                '**/bootstrap.min.js',
                '!**/jquery.min.js'
            ]
        },
        watch: {
            scripts: [
                './bower_components/**/*.js',
                './node_modules/**/*.js'
            ]
        }
      }
    },
    'css/vendor': {
        styles: [
          './bower_components/bootstrap/dist/css/bootstrap.min.css',
          './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
          './node_modules/alpaca/dist/alpaca/bootstrap/alpaca.min.css',
          './node_modules/react-select/dist/react-select.min.css',
          './bower_components/font-awesome/css/font-awesome.min.css',
          './bower_components/bootstrap/dist/css/bootstrap.min.css',
          './bower_components/bootstrap-table/dist/bootstrap-table.min.css',
          './bower_components/css-toggle-switch/dist/toggle-switch.css',
          './bower_components/jquery-simplecolorpicker/jquery-simplecolorpicker.css'
        ],
        options: {
          minCSS: false,
          rev: false,
          watch: {
              styles: [
                  './bower_components/**/*.css',
                  './node_modules/**/*.css'
              ]
          }
        }
    }
  }
};
