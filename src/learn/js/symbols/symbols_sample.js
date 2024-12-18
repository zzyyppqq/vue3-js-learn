// Symbols —— 实现了的反射
Symbol(); // symbol
console.log(Symbol()); // 输出 "Symbol()" 至控制台
console.log(typeof Symbol() === 'symbol') // true
//new Symbol(); // TypeError: Symbol is not a constructor

// Symbols 拥有内置的 debug 能力
console.log(Symbol('foo')); // 输出 "Symbol(foo)" 至控制台
console.log(Symbol('foo').toString() === 'Symbol(foo)');

// Symbols 能被用作对象的 key
var myObj = {};
var fooSym = Symbol('foo');
var otherSym = Symbol('bar');
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
console.log(myObj.foo === 'bar');
console.log(myObj[fooSym] === 'baz');
console.log(myObj[otherSym] === 'bing');

// Symbols key 无法通过 for in、for of 或者 Object.getOwnPropertyNames 获得
// 获得它们的唯一方式是 Object.getOwnPropertySymbols
var fooSym = Symbol('foo');
Object.keys(myObj); // -> [ 'foo' ]
Object.getOwnPropertyNames(myObj); // -> [ 'foo' ]
Object.getOwnPropertySymbols(myObj); // -> [ Symbol(foo) ]
console.log(Object.getOwnPropertySymbols(myObj)[0] === fooSym); // false

// Symbols 是完全唯一
var foo1 = Symbol('foo');
var foo2 = Symbol('foo');
console.log(foo1 === foo2) // false

// JavaScript 也有另一个创建 Symbol 的方式来轻易地实现 Symbol 的获得和重用：Symbol.for()。
// 该方法在 “全局 Symbol 注册中心” 创建了一个 Symbol。额外注意的一点：这个注册中心也是跨域的，
// 意味着 iframe 或者 service worker 中的 Symbol 会与当前 frame Symbol 相等

var fooSym = Symbol.for('foo');
var otherSym = Symbol.for('foo');
console.log(fooSym === otherSym) // true
/*
// 跨域
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
console.log(iframe.contentWindow.Symbol, Symbol);
console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')); // true!
*/

// Symbol.keyFor()
var localFooSymbol = Symbol('foo');
var globalFooSymbol = Symbol.for('foo');

console.log(Symbol.keyFor(localFooSymbol) === undefined); // true
console.log(Symbol.keyFor(globalFooSymbol) === 'foo'); // true
console.log(Symbol.for(Symbol.keyFor(globalFooSymbol)) === Symbol.for('foo')); // true
