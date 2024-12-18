
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
function newObject() {
    const obj = {};
    const constructor = [].shift.call(arguments);
    obj.__proto__ = constructor.prototype;
    constructor.apply(obj, arguments);
    return obj;
}

const person0 = newObject(Person, 'zyp', 23)
console.log(person0)


function myNew(constructor, ...args) {
    // 1. 创建一个空对象
    const obj = {};

    // 2. 将新对象的 prototype 设置为构造函数的 prototype
    Object.setPrototypeOf(obj, constructor.prototype);
    // 等价
    //obj.__proto__ = constructor.prototype
    console.log('constructor: ', constructor)
    console.log('constructor.prototype: ', constructor.prototype)
    console.log('constructor.prototype.__proto__: ', constructor.prototype.__proto__)
    // 3. 执行构造函数，绑定 this 为新创建的对象，并传入参数
    const result = constructor.apply(obj, args);

    // 4. 如果构造函数返回的是对象，则返回该对象，否则返回新创建的对象
    return result instanceof Object ? result : obj;
}

const person = new Person('zyp', 32)
console.log(person)

// 使用手动实现的 myNew 创建实例
const person1 = myNew(Person, 'Alice', 30);
person1.sayName();  // "Alice"
console.log(person1 instanceof Person);  // true
console.log(person1 instanceof Object);  // true

