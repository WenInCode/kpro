const _string = require('lodash/string');
const _array = require('lodash/array');

function parsePSOutput(output) {
  let lines = _string.split(output, '\n');

  return lines
      .filter(line => line.length > 0)
      .map(line => parsePSLine(line));
}

function parsePSLine(line) {
  let lineValues = _string.words(line, /[^, ]+/g);

  return buildLineObject(lineValues);
}

function buildLineObject(values) {
  return {
    pid: values[0],
    time: values[2],
    command: _array.slice(values, 3).join(' ')
  };
}

module.exports = parsePSOutput;
