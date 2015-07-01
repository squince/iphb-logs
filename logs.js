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
  sanitizeArgs: function(originalArguments, color, label) {
    var args = Array.prototype.slice.call(originalArguments);
    args.unshift(label);
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
    console.log.apply(console, this.sanitizeArgs(arguments, colors.debug, '[Debug] '));
  },
  error: function() {
    if (!this.enable.error || !this.enable.logging) {
      return;
    }
    console.error.apply(console, this.sanitizeArgs(arguments, colors.error, '[Error] '));
  },
  warn: function() {
    if (!this.enable.warn || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.warn, '[Warn]  '));
  },
  input: function() {
    if (!this.enable.input || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.input, '[Input] '));
  },
  info: function() {
    if (!this.enable.info || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.info, '[Info]  '));
  }
};

module.exports = log;
