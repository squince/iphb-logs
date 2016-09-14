/**
 * Simple API for logging that gives a central place to control logging behavior
 */

// Yoink in console colors (we use colors/safe so no overrides)
var colors = require('colors/safe');

// Set the colors for various log levels
colors.setTheme({
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  notice: 'yellow',
  debug: 'white',
  success: 'green',
  fail: 'red',
  error: 'red'
});

/**
 * Main export object
 * @type {Object}
 */
var log = {

  /**
   * Settings
   * @type {Object}
   */
  enable: {
    logging: true,
    debug: false,
    verbose: false,
    warn: true,
    notice: true,
    tests: false,
    input: true,
    info: true,
    help: true,
    data: true,
    error: true
  },
  /**
   * @function sanitizeArgs
   * @description Used for general formatting and color application of the log
   *           output
   * @param  {object} originalArguments The special 'argument' object from
   *                                    the original call to the log functions
   * @param  {string} color             The color to the log output
   * @param  {string} label             The label to prefix to this log output
   * @return {array}                    Cleaned up log output
   */
  sanitizeArgs: function(originalArguments, color, label) {
    var args = Array.prototype.slice.call(originalArguments);
    args.unshift(label);
    var c = args.length;
    while (c--) {
      if (typeof args[c] === "object") {
        args[c] = "\n" + JSON.stringify(args[c], null, 2);
      }
      args[c] = color(args[c]);
    }
    return args;
  },
  /**
   * @function debug
   * @description Debug Log Output
   */
  debug: function() {
    if (!this.enable.debug || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.debug, '[Debug]  '));
  },
  /**
   * @function error
   * @description Error Log Output
   */
  error: function() {
    if (!this.enable.error || !this.enable.logging) {
      return;
    }
    console.error.apply(console, this.sanitizeArgs(arguments, colors.error, '[Error]  '));
  },
  /**
   * @function warn
   * @description Warn Log Output
   */
  help: function() {
    if (!this.enable.help || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.help, '[Help]   '));
  },
  /**
   * @function warn
   * @description Warn Log Output
   */
  warn: function() {
    if (!this.enable.warn || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.warn, '[Warn]   '));
  },
  /**
   * @function notice
   * @description Notice Log Output
   */
  notice: function() {
    if (!this.enable.warn || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.warn, '[Notice] '));
  },
  /**
   * @function input
   * @description Input Log Output
   */
  input: function() {
    if (!this.enable.input || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.input, '[Input]  '));
  },
  /**
   * @function verbose
   * @description Verbose Log Output
   */
  verbose: function() {
    if (!this.enable.verbose || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.verbose, '[Verbose]'));
  },
  /**
   * @function info
   * @description Info Log Output
   */
  info: function() {
    if (!this.enable.info || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.info, '[Info]   '));
  },
  /**
   * @function info
   * @description Info Log Output
   */
  success: function() {
    if (!this.enable.tests) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.success, '[Success]'));
  },
  /**
   * @function info
   * @description Info Log Output
   */
  fail: function() {
    if (!this.enable.tests) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.fail, '[Fail]   '));
  },
  /**
   * @function data
   * @description Data Log Output
   */
  data: function() {
    if (!this.enable.data || !this.enable.logging) {
      return;
    }
    console.log.apply(console, this.sanitizeArgs(arguments, colors.data, '[Data]   '));
  }
};

// Expose the log functions
module.exports = log;
