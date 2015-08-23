const Canvas = require('canvas');

const drawEntity = {
  path: function(path) {
    this.beginPath();

    path.points.forEach(function(point, index) {
      if(index === 0) {
        this.moveTo(point[0], point[1]);
      } else {
        this.lineTo(point[0], point[1]);
      }
    }.bind(this));

    if(path.stroke) {
      this.stroke();
    }

    if(path.fill) {
      this.fill();
    }
  },
  rect: function(rect) {
    const args = [rect.x1, rect.y1, rect.x2, rect.y2];

    if(rect.fill) {
      this.fillRect.apply(this, args);
    }

    if(rect.stroke) {
      this.strokeRect.apply(this, args);
    }
  },
  text: function(text) {
    const args = [text.text, text.x, text.y];

    console.log(this.font);
    if(text.fill) {
      this.fillText.apply(this, args);
    }

    if(text.stroke) {
      this.strokeText.apply(this, args);
    }
  }
};

function configureContext(context, options) {
  Object.keys(options).forEach(function(key) {
    context[key] = options[key];
  });
}

function draw(config, objects) {
  const canvas = new Canvas(config.width, config.height),
        context = canvas.getContext('2d');

  if(config.background) {
    context.fillStyle = config.background;
    context.fillRect(0, 0, config.width, config.height);
  }

  objects.forEach(function(object) {
    configureContext(context, object.context || {});
    drawEntity[object.name].call(context, object);
  });

  return canvas.pngStream();
}

module.exports = draw;

