var colors = require('colors/safe');

colors.setTheme({
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var log = {
  enable: {
    logging: false,
    debug: false,
    warn: true,
    input: true,
    info: true,
    error: true
  },
  sanitizeArgs: function(originalArguments, color) {
    var args = Array.prototype.slice.call(originalArguments);
    var c = args.length;
    while (c--) {
      if (typeof(args[c]) === "object") {
        args[c] = "\n" + JSON.stringify(args[c], null, 2);
      }
      args[c] = color(args[c]);
    }
    return args;
  },
  debug: function() {
    if (!this.enable.debug || !this.enable.logging) {
      return;
    }
    arguments.unshift('[Debug]');
    console.log.apply(console, this.sanitizeArgs(arguments, colors.debug));
  },
  error: function() {
    if (!this.enable.error || !this.enable.logging) {
      return;
    }
    arguments.unshift('[Error]');
    console.error.apply("Error:", this.sanitizeArgs(arguments, colors.error));
  },
  warn: function() {
    if (!this.enable.warn || !this.enable.logging) {
      return;
    }
    arguments.unshift('[Warn] ');
    console.log.apply(console, this.sanitizeArgs(arguments, colors.warn));
  },
  input: function() {
    if (!this.enable.input || !this.enable.logging) {
      return;
    }
    arguments.unshift('[Input]');
    console.log.apply(console, this.sanitizeArgs(arguments, colors.input));
  },
  info: function() {
    if (!this.enable.info || !this.enable.logging) {
      return;
    }
    arguments.unshift('[Info] ');
    console.log.apply(console, this.sanitizeArgs(arguments, colors.info));
  }
};

module.exports = log;
