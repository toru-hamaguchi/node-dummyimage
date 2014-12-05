var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Canvas = require('canvas');

var DEFAULT_CONFIG = {
  dest: './',
  format: 'png',
  text: 'Dummy Image',
  background: 'rgba(238, 238, 238, 1)',
  color: 'rgba(0, 0, 0, 1)',
  font: '30px Arial',
  width: 350,
  height: 200
};

/**
 * @constructor
 */
var DummyImage = function() {
  this.initialize.apply(this, arguments);
};

/**
 * Initialize.
 * @param  {Object} config
 */
DummyImage.prototype.initialize = function(config) {
  this.config = _.extend({}, DEFAULT_CONFIG, config);

  this.setExtension();
  if (!this.config.name || !this.ext) {
    throw new Error('Invalid name or format.');
  }

  this.canvas = new Canvas(this.config.width, this.config.height);
  this.ctx = this.canvas.getContext('2d');
  this.path = path.join(this.config.dest, this.config.name + this.ext);
};

/**
 * Create dummy image.
 * @param  {Function} callback
 */
DummyImage.prototype.create = function(callback) {
  var stream;
  var out;

  this.draw();
  stream = this.getCanvasStream();

  mkdirp.sync(this.config.dest);
  out = fs.createWriteStream(this.path);

  stream
    .on('data', function(chunk) {
      out.write(chunk);
    })
    .on('end', callback.bind(this));
};

/**
 * Draw canvas.
 */
DummyImage.prototype.draw = function() {
  var ctx = this.ctx;
  var config = this.config;

  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, config.width, config.height);

  ctx.fillStyle = config.color;
  ctx.font = config.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(config.text, config.width / 2, config.height / 2);
};

/**
 * Set file extension.
 */
DummyImage.prototype.setExtension = function() {
  var format = this.config.format.toLowerCase();

  switch(format) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      this.ext = '.'+ format;
      break;
    default:
      break;
  }
};

/**
 * Get canvas stream.
 * @return {Stream}
 */
DummyImage.prototype.getCanvasStream = function() {
  var stream;

  switch(this.ext) {
    case '.png':
      stream = this.canvas.pngStream();
      break;
    case '.jpg':
    case '.jpeg':
      stream = this.canvas.jpegStream({
        bufSize: 4096,
        quality: 75,
        progressive: false
      });
      break;
    default:
      break;
  }

  return stream;
};

module.exports = DummyImage;
