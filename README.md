# moment-immutable-methods

Module extends moment factory so each instance returned is decorated with set of immutable methods. Each existing method will receive corresponding immutable version with its original name being appended with `Immu`. E.g.:

- for `startOf()` it attaches `startOfImmu()`,
- for `add()` it attaches `addImmu()`
- for timezone plugin `tz` method, receives corresponding `tzImmu` 

and so on. All these are generated automatically and do not rely on any sort of hardcoded list so if any new methods become available within new moment.js versions, these should also receive immutable versions. 
Existing methods stay exactly same and decorating with this module should be safe for existing code. Also plugins seem to work perfectly and please see sample code below for usage:

```js
var moment = require('moment'); // or moment-timezone 
import { momentImmutableMethods } from 'moment-immutable-methods';

// to decorate instances with immutable methods we need to extend moment factory as below:
momentImmutableMethods(moment);

// now every instance returned by moment will have Immu methods attached.

// MUTABLE EXAMPLE
// just to show default behaviour with mutable methods as they come with moment by default. Immutable example is further down
const aaa = moment({
  hour: 5,
  minute: 10
});
// Moment {_isAMomentObject: true, _i: {…}, _isUTC: false, _pf: {…}, _locale: Locale, …}
const bbb = aaa.startOf('day')
// Moment {_isAMomentObject: true, _i: {…}, _isUTC: false, _pf: {…}, _locale: Locale, …}
console.log(aaa === bbb);
// true
const ccc = bbb.startOf('month');
// Moment {_isAMomentObject: true, _i: {…}, _isUTC: false, _pf: {…}, _locale: Locale, …}
console.log(aaa === ccc);
// true
console.log(bbb === ccc);
// true
console.log(aaa.format('DD/MM/YY HH:mma'));
// "08/04/18 00:00am"
console.log(bbb.format('DD/MM/YY HH:mma'));
// "08/04/18 00:00am"
console.log(ccc.format('DD/MM/YY HH:mma'));
// "08/04/18 00:00am"


// IMMUTABLE EXAMPLE
// we using immutable methods that were attached to every instance, these have Immu appended to original name
const ddd = moment({
  hour: 5,
  minute: 10
});
// Moment {_isAMomentObject: true, _i: {…}, _isUTC: false, _pf: {…}, _locale: Locale, …}
const eee = ddd.startOfImmu('day');
// Moment {_isAMomentObject: true, _i: {…}, _isUTC: false, _pf: {…}, _locale: Locale, …}
console.log(ddd === eee);
// false
const fff = eee.startOfImmu('month');
// Moment {_isAMomentObject: true, _i: {…}, _isUTC: false, _pf: {…}, _locale: Locale, …}
console.log(ddd === fff);
// false
console.log(eee === fff);
// false
console.log(ddd.format('DD/MM/YY HH:mma'));
// "14/04/18 05:10am"
console.log(eee.format('DD/MM/YY HH:mma'));
// "14/04/18 00:00am"
console.log(fff.format('DD/MM/YY HH:mma'));
// "08/04/18 00:00am"


// PLUGINS
// original methods are not modified in any way and plugins should work as expected. If plugin returns moment, this also should have immutable methods attached automatically. Below example is using moment-range plugin 

// assume its already imported with
// import { extendMoment } from 'moment-range'; 

extendMoment(moment);

const start = moment('2011-04-15', 'YYYY-MM-DD');
const end = moment('2011-11-27', 'YYYY-MM-DD');
const range = moment.range(start, end);

console.log(typeof range.start.startOfImmu); // function

const a = moment('2016-03-10');
const b = moment('2016-03-15');
const c = moment('2016-03-29');
const d = moment('2016-04-01');

let range1 = moment.range(a, b);
let range2 = moment.range(b, c);
let range3 = moment.range(c, d);

console.log(range1.adjacent(range2)) // true
console.log(range1.adjacent(range3)) // false


// timezone plugin, assume its already imported instead of plain moment

const ggg = moment("2014-06-01T12:00:00Z");

const hhh = ggg.tz('America/Los_Angeles'); // 5am PDT
console.log(ggg === hhh); //true

const iii = hhh.tz('America/New_York'); // 8am EDT
console.log(ggg === iii); // true

console.log(ggg.format('ha z')); // 8am EDT
console.log(hhh.format('ha z')); // 8am EDT
console.log(iii.format('ha z')); // 8am EDT

const jjj = moment("2014-06-01T12:00:00Z");

const kkk = jjj.tzImmu('America/Los_Angeles'); // 5am PDT
console.log(jjj === kkk); // false

const lll = kkk.tzImmu('America/New_York'); // 8am EDT
console.log(jjj === lll); // false

console.log(jjj.format('ha z')); // 10pm
console.log(kkk.format('ha z')); // 5am PDT
console.log(lll.format('ha z')); // 8am EDT
```


## How to install
```
npm install --save moment-immutable-methods
```