# Background Size Parser

Parses values for the CSS `background-size` property.

## Usage

The parse method takes [any valid](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) `background-size` property as a string.

```javascript
const { parse } = require('bg-size-parser');

parse('3em 25%');

// [{
//   width: { size: 3, unit: 'em' },
//   height: { size: 25, unit: '%' }
// }]

parse('cover');

// [{
//   keyword: 'cover'
// }]

parse('6px, auto, contain');

// [
//   {
//     width: { size: 6, unit: 'px' },
//     height: { size: 'auto' }
//   },
//   {
//     width: { size: 'auto' },
//     height: { size: 'auto' }
//   },
//   { keyword: 'contain' }
// ]

parse('calc(100% + 200px) 100px');

// [
//   {
//     width: { calculation: 'calc(100% + 200px)' },
//     height: { size: 100, unit: 'px' }
//   }
// ]

parse('400px var(--foo, 100px)');

// [
//   {
//     width: { size: 400, unit: 'px' },
//     height: {
//       variable: 'var(--foo, 100px)',
//       name: '--foo',
//       fallback: '100px'
//     }
//   }
// ]
```
