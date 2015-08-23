function parseArgs(argv) {
  if(argv._.length === 0) {
    throw new Error('You must specify a JSON file!');
  }

  const input = argv._[0],
        output = (argv.output || argv.o) || input.replace(/\.json$/, '.png');

  return {
    input: input,
    output: output
  };
}

module.exports = parseArgs;

