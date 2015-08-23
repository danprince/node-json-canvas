const fs = require('fs'),
      jsonfile = require('jsonfile'),
      minimist = require('minimist');

const parseArgs = require('./lib/parseArgs'),
      draw = require('./lib/draw');

const argv = minimist(process.argv.slice(2)),
      options = parseArgs(argv);

jsonfile.readFile(options.input, function(err, json) {
  if(err) throw err;

  const pngStream = draw(json.config, json.objects),
        outputStream = fs.createWriteStream(options.output);

  pngStream.on('data', function(chunk) {
    outputStream.write(chunk);
  });

  pngStream.on('end', function() {
    console.log('Written to file: ' + options.output);
  });
});

