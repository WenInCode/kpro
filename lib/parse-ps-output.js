const _ = require('lodash/string');

function parsePSOutput(output) {
  let lines = _.split(output, '\n');

  return lines.map(line => parsePSLine(line));
}

function parsePSLine(line) {
  lineValues = _.words(line, /[^, ]+/g);
  return buildLineObject(lineValues);
}

function buildLineObject(values) {
  return values;
}

module.exports = parsePSOutput;
