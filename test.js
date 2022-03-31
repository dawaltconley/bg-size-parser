const assert = require('assert').strict;
const path = require('path');
const p = (...args) => path.join(__dirname, ...args);

require(p('build.js'));
const { parse } = require(p('index.js'));

const tests = [
    {
        input: [ 'cover' ],
        output: [ { keyword: 'cover' } ],
    },
    {
        input: [ 'contain' ],
        output: [ { keyword: 'contain' } ]
    },
    {
        input: [ 'inherit' ],
        output: [ { keyword: 'inherit' } ],
    },
    {
        input: [ 'initial' ],
        output: [ { keyword: 'initial' } ],
    },
    {
        input: [ 'unset' ],
        output: [ { keyword: 'unset' } ],
    },
    {
        input: [ '50%', '50.0%', '50.00%' ],
        output: [ { width: { size: 50, unit: '%' }, height: { size: 'auto' } } ]
    },
    {
        input: [ '3.2em', '3.20em' ],
        output: [ { width: { size: 3.2, unit: 'em' }, height: { size: 'auto' } } ]
    },
    {
        input: [ '12px', '12.000px' ],
        output: [ { width: { size: 12, unit: 'px' }, height: { size: 'auto' } } ]
    },
    {
        input: [ 'auto' ],
        output: [
            {
                width: { size: 'auto', unit: undefined },
                height: { size: 'auto' }
            }
        ]
    },
    {
        input: [ '50% auto', '50.0% auto' ],
        output: [
            {
                width: { size: 50, unit: '%' },
                height: { size: 'auto', unit: undefined }
            }
        ]

    },
    {
        input: [ '3em 25%', '3.0em 25.0%' ],
        output: [ { width: { size: 3, unit: 'em' }, height: { size: 25, unit: '%' } } ]
    },
    {
        input: [ 'auto 6px', 'auto 6.00px' ],
        output: [
            {
                width: { size: 'auto', unit: undefined },
                height: { size: 6, unit: 'px' }
            }
        ]

    },
    {
        input: [ 'auto auto' ],
        output: [
            {
                width: { size: 'auto', unit: undefined },
                height: { size: 'auto', unit: undefined }
            }
        ]
    },
    {
        input: [ 'auto, auto' ],
        output: [
            {
                width: { size: 'auto', unit: undefined },
                height: { size: 'auto' }
            },
            {
                width: { size: 'auto', unit: undefined },
                height: { size: 'auto' }
            }
        ]

    },
    {
        input: [ '50%, 25%, 25%', '50.0%, 25.0%, 25.000%' ],
        output: [
            { width: { size: 50, unit: '%' }, height: { size: 'auto' } },
            { width: { size: 25, unit: '%' }, height: { size: 'auto' } },
            { width: { size: 25, unit: '%' }, height: { size: 'auto' } }
        ]

    },
    {
        input: [ '6px, auto, contain', '6.00px, auto, contain'  ],
        output: [
            { width: { size: 6, unit: 'px' }, height: { size: 'auto' } },
            {
                width: { size: 'auto', unit: undefined },
                height: { size: 'auto' }
            },
            { keyword: 'contain' }
        ]

    },
    {
        input: [ '50%, 200px 100rem, 200.0vmin' ],
        output: [
            { width: { size: 50, unit: '%' }, height: { size: 'auto' } },
            {
                width: { size: 200, unit: 'px' },
                height: { size: 100, unit: 'rem' }
            },
            { width: { size: 200, unit: 'vmin' }, height: { size: 'auto' } }
        ]

    },
    {
        input: [ 'calc(200px)' ],
        output: [
            {
                width: { calculation: 'calc(200px)' },
                height: { size: 'auto' }
            }
        ]
    },
    {
        input: [ 'calc(100% + 200px) 100px' ],
        output: [
            {
                width: { calculation: 'calc(100% + 200px)' },
                height: { size: 100, unit: 'px' }
            }
        ]
    },
    {
        input: [ 'max(20vw, 400px) 100px' ],
        output: [
            {
                width: { max: 'max(20vw, 400px)' },
                height: { size: 100, unit: 'px' }
            }
        ]
    },
    {
        input: [ 'min(50vw, 200px)' ],
        output: [
            {
                width: { min: 'min(50vw, 200px)' },
                height: { size: 'auto' }
            }
        ]
    },
    {
        input: [ 'clamp(1rem, 2.5vw, 2rem)' ],
        output: [
            {
                width: { clamp: 'clamp(1rem, 2.5vw, 2rem)' },
                height: { size: 'auto' }
            }
        ]
    },
    {
        input: [ 'var(--foo-bar)' ],
        output: [
            {
                width: { variable: 'var(--foo-bar)', name: '--foo-bar', fallback: undefined },
                height: { size: 'auto' }
            }
        ]
    },
    {
        input: [ 'var(--baz) 50%' ],
        output: [
            {
                width: { variable: 'var(--baz)', name: '--baz', fallback: undefined },
                height: { size: 50, unit: '%'}
            }
        ]
    },
    {
        input: [ '400px var(--camelCase)' ],
        output: [
            {
                width: { size: 400, unit: 'px' },
                height: { variable: 'var(--camelCase)', name: '--camelCase', fallback: undefined }
            }
        ]
    },
    {
        input: [ 'var( --spacing )' ],
        output: [
            {
                width: { variable: 'var( --spacing )', name: '--spacing', fallback: undefined },
                height: { size: 'auto' }
            }
        ]
    },
    {
        input: [ 'var(--fallback , 100px)' ],
        output: [
            {
                width: { variable: 'var(--fallback , 100px)', name: '--fallback', fallback: '100px' },
                height: { size: 'auto' }
            }
        ]
    },
];

for (const { input, output } of tests) {
    for (const i of input) {
        assert.deepEqual(parse(i), output);
    }
}

console.log('All tests passed.');
