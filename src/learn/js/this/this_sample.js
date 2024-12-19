// [(26 封私信 / 80 条消息) JavaScript 的 this 原理是什么？ - 知乎](https://www.zhihu.com/question/353757734/answer/964557747)
// 浏览器中
/** ====== 场景1：全局环境下的 this =====*/
// 在执行函数时，如果函数中的this是被上一级的对象所调用，那么this指向的就是上一级的对象；否则指向全局环境。
function f1 () {
    console.log(this)
}
function f2 () {
    'use strict'
    console.log(this)
}
f1() // window
f2() // undefined

const foo = {
    bar: 10,
    fn: function() {
        console.log(this)
        console.log(this.bar)
    }
}
try {
    // 虽然fn函数在foo对象中作为方法被引用，但是在赋值给fn1之后，fn1的执行仍然是在window的全局环境中
    var fn1 = foo.fn
    fn1()
} catch (err) {
    console.log(err.message)
}

foo.fn()

/** ====== 场景2：上下文对象调用中的 this =====*/

const person = {
    name: 'Lucas',
    brother: {
        name: 'Mike',
        fn: function() {
            return this.name
        }
    }
}
console.log(person.brother.fn())

const o1 = {
    text: 'o1',
    fn: function() {
        return this.text
    }
}
const o2 = {
    text: 'o2',
    fn: function() {
        return o1.fn()
    }
}
const o3 = {
    text: 'o3',
    fn: function() {
        var fn = o1.fn
        return fn()
    }
}
try {
    console.log(o1.fn()) // o1
    console.log(o2.fn()) // o1
    console.log(o3.fn()) // error
} catch (err) {
    console.log(err.message)
}

// o2.fn()输出 o2，该怎么做？
// 不能使用bind/call/apply，有别的方法吗？
{
    const o2 = {
        text: 'o2',
        fn: o1.fn
    }
    console.log(o2.fn()) // o2
};

/** ====== 场景3：bind/call/apply 改变 this 指向 =====*/

{
    const foo = {
        name: 'lucas',
        logName: function () {
            console.log(this.name)
        }
    }
    const bar = {
        name: 'mike'
    }
    console.log(foo.logName.call(bar))
}

/** ====== 场景 4：构造函数和 this =====*/

function Foo() {
    this.bar = "Lucas"
}
const instance = new Foo()
console.log(instance.bar)
/**
 * new 操作符调用构造函数，具体做了什么？
 * 1.创建一个新的对象；
 * 2.将构造函数的 this 指向这个新对象；
 * 3.为这个对象添加属性、方法等；
 * 4.最终返回新对象
 * var obj  = {}
 * obj.__proto__ = Foo.prototype
 * Foo.call(obj)
 */

// 如果在构造函数中出现了显式 return 的情况，那么需要注意分为两种场景：
// 结论：
// 1.如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；
// 2.如果返回的不是一个对象，那么 this 仍然指向实例。
{
    function Foo(){
        this.user = "Lucas"
        const o = {}
        return o
    }
    const instance = new Foo()
    // 将会输出 undefined，此时 instance 是返回的空对象 o
    console.log(instance)
}

{
    function Foo(){
        this.user = "Lucas"
        return 1
    }
    const instance = new Foo()
    // 将会输出 Lucas，也就是说此时 instance 是返回的目标对象实例 this
    console.log(instance)
}

/** ====== 场景 5：箭头函数中的 this 指向 =====*/

{
    const foo = {
        fn: function () {
            setTimeout(function() {
                // this 出现在 setTimeout() 中的匿名函数里，因此 this 指向 window 对象
                //console.log(this)
            })
        }
    }
    console.log(foo.fn())
}

{
    const foo = {
        fn: function () {
            setTimeout(() => {
                // 如果需要 this 指向 foo 这个 object 对象，可以巧用箭头函数解决：
                //console.log(this)
            })
        }
    }
    console.log(foo.fn()) // {fn: ƒ}
}

/** ====== 终极场景 6：this 优先级相关 =====*/
// 通过 call、apply、bind、new 对 this 绑定的情况称为显式绑定；
// 根据调用关系确定的 this 指向称为隐式绑定。
// 那么显式绑定和隐式绑定谁的优先级更高呢？

{
    function foo(a) {
        console.log(this.a)
    }

    const obj1 = {
        a: 1,
        foo: foo
    }

    const obj2 = {
        a: 2,
        foo: foo
    }
    console.log('-------')
    // 输出分别为 2、1，也就是说 call、apply 的显式绑定一般来说优先级比隐式绑定更高。
    obj1.foo.call(obj2) // 2
    obj2.foo.call(obj1) // 1
}

{
    function foo (a) {
        this.a = a
    }

    const obj1 = {}

    var bar = foo.bind(obj1)
    bar(2)
    // 通过 bind，将 bar 函数中的 this 绑定为 obj1 对象。执行 bar(2) 后，obj1.a 值为 2。
    // 即经过 bar(2) 执行后，obj1 对象为：{a: 2}。
    console.log(obj1.a) // 2

    // bar 函数本身是通过 bind 方法构造的函数，其内部已经对将 this 绑定为 obj1，
    // 它再作为构造函数，通过 new 调用时，返回的实例已经与 obj1 解绑
    // new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高。
    var baz = new bar(3)
    console.log(baz.a) // 3
}

{
    function foo() {
        return a => {
            console.log(this.a)
        };
    }

    const obj1 = {
        a: 2
    }

    const obj2 = {
        a: 3
    }

    const bar = foo.call(obj1)
    // 由于 foo() 的 this 绑定到 obj1，bar（引用箭头函数）的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。
    console.log(bar.call(obj2)) // 2
}

{
    var a = 123
    const foo = () => a => {
        console.log(this.a)
    }

    const obj1 = {
        a: 2
    }

    const obj2 = {
        a: 3
    }

    var bar = foo.call(obj1)
    console.log(bar.call(obj2)) // 123
}

{
    const a = 123
    const foo = () => a => {
        console.log(this.a)
    }

    const obj1 = {
        a: 2
    }

    const obj2 = {
        a: 3
    }

    var bar = foo.call(obj1)
    console.log(bar.call(obj2)) // undefined
}