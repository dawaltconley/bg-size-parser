const fs = require('fs');
const path = require('path');
const peg = require('peggy');

const p = (...args) => path.join(__dirname, ...args);

const grammar = fs.readFileSync(p('parser.pegjs')).toString();
const parser = peg.generate(grammar, {
    output: 'source',
    format: 'commonjs'
});

fs.writeFileSync(p('index.js'), parser);
