// [Reflect是什么都有哪些方法](https://juejin.cn/post/7419978042246365221)
/** ==== 函数相关 ==== */

console.log("==== 函数相关 ====")
function greet(name, age) {
    console.log(`Hello, my name is ${name} and I am ${age} years old.`);
}
const args = ['John', 30];
Reflect.apply(greet, null, args); // 相当于 greet(...args)

greet.apply(null, args);


function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Employee(name, age, position) {
    Person.call(this, name, age);
    this.position = position;
}

const args2 = ['John', 30, 'Manager'];
// 相当于 new Person(...args)
const instance = Reflect.construct(Person, args);
// 使用 Reflect.construct 来指定继承
const employee = Reflect.construct(Employee, args2, Person);

console.log(employee instanceof Employee);  // true
console.log(employee instanceof Person);    // true
console.log(employee.position);  // 'Manager'


/** ==== 原型相关 ==== */
console.log("==== 原型相关 ====")

const obj = { x: 1 };
const proto = Reflect.getPrototypeOf(obj); // 相当于 Object.getPrototypeOf(obj)
console.log(proto === Object.prototype); // true

Reflect.setPrototypeOf(obj, Array.prototype); // 设置 obj 的原型为 Array.prototype
console.log(obj instanceof Array); // true

/** ==== 对象相关 ==== */
console.log("==== 对象相关 ====")
// Reflect.defineProperty() 方法基本等同于 Object.defineProperty，但返回值略有不同。如果定义属性成功，它会返回true，否则返回false。
// Reflect.deleteProperty() 方法基本等同于 delete operator，用于删除一个对象的属性。
// Reflect.get(target, propertyKey, receiver) 方法用于读取属性值，等同于target[propertyKey]，但receiver参数可以改变getter的this对象。
// Reflect.set(target, propertyKey, value, receiver) 方法用于设置属性值，等同于target[propertyKey] = value，但receiver参数可以改变setter的this对象。
// Reflect.has(target, propertyKey) 方法基本等同于propertyKey in target，用于检查一个属性是否在某个对象中。
// Reflect.getOwnPropertyDescriptor(target, propertyKey)方法用于获取对象自身的某个属性的属性描述符，等同于Object.getOwnPropertyDescriptor()。
// Reflect.ownKeys(target) 方法返回一个由目标对象自身的属性键组成的数组，等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
// Reflect.isExtensible(target) 方法用于判断一个对象是否可扩展，等同于Object.isExtensible()。
// Reflect.preventExtensions(target)方法基本等同于Object.preventExtensions()，用于使一个对象变为不可扩展。如果操作成功则返回true，否则返回false。

/** ==== 配合proxy实现代理等元编程操作 ==== */
console.log("==== 配合proxy实现代理等元编程操作 ====")

// Symbol：通过内置Symbol值复写 js语言中的基本操作。
// Reflect：可以获取语言内部的基本操作。
// Proxy：通过钩子函数 拦截&改变 js语言的基本操作。

const obj2 = {};
const proxyObj = new Proxy(obj2,{
    get(target, property, receiver){
        console.log(`get ${property}`, target[property])
        return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver){
        console.log(`set ${property}`, value)
        return Reflect.set(target, property, value, receiver);
    },
    deleteProperty(target, property){ // 拦截属性删除
        console.log(`delete ${property}`)
        return Reflect.deleteProperty(target, property);
    }
})

proxyObj.name = 'test'
console.log(proxyObj.name)
delete proxyObj.name;
console.log(proxyObj.name)


/** 为什么proxy里一定要使用reflect？*/
console.log("==== 配合proxy实现代理等元编程操作 ====")
const obj3 = {
    _name: 'test',
    get name(){
        return this._name;
    }
};
const proxyObj1 = new Proxy(obj3,{
    get(target, property, receiver){
        return target[property];
    },
});

const proxyObj2 = new Proxy(obj3,{
    get(target, property, receiver){
        return Reflect.get(target, property, receiver);
    },
});

const child = {
    _name: 'child'
};
Reflect.setPrototypeOf(child, proxyObj1);

console.log(child.name) // test
console.log(proxyObj1.name) // test

Reflect.setPrototypeOf(child, proxyObj2);
console.log(child.name) // child
console.log(proxyObj2.name) // test