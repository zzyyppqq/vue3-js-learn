// [js原型与原型链(精心总结)](https://juejin.cn/post/7448066040472944651)

// ====== 创建对象 =======
// 1.对象字面量方式
let person0 = {
    name: 'John',
    age: 30,
    greet: function() {
        console.log('Hello ' + this.name);
    }
};

// 2.使用 new Object() 创建对象
let person = new Object();
person.name = 'John';
person.age = 30;
person.greet = function() {
    console.log('Hello ' + this.name);
};

// 3.使用构造函数创建对象
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log('Hello ' + this.name);
    };
}

let person1 = new Person('John', 30);
let person2 = new Person('Alice', 25);

function Test(){
    this.name = 'rose'
    this.say = function(){
        console.log('我能说话')
    }
}

const obj3 = new Test();
const obj4 = new Test();

console.log(obj3.say === obj4.say) // false
console.log(obj3.name === obj4.name) // true

/** ==== 原型 ==== */
// 将 say 方法添加到原型上
Test.prototype.say2 = function() {
    console.log('我能说话');
};
console.log(obj3.say2 === obj4.say2);  // 输出: true

/** ===== 隐式原型__proto__ ========== */
// 实例对象当然也是对象，也存在__proto__属性
// (1)每个js对象都有一个隐藏的原型对象属性__proto__，它指向创建它的构造函数的原型对象（Test.prototype）
// (2)proto__存在的意义在于为原型链查找提供方向，原型链查找靠的是__proto，而不是prototype
console.log(obj3.__proto__ === Test.prototype) // true
// 构造函数是Test, 实例是obj3
console.log(obj3.constructor === Test ) // true
console.log(obj3.__proto__ === Test) // false
console.log(Test.prototype === obj3.__proto__) // true
console.log(obj3.__proto__.constructor === Test) // true

/** ===== 原型链 ========== */
console.log(Test.prototype.__proto__ === Object.prototype) // true
console.log(obj3.__proto__.__proto__ === Object.prototype) // true
console.log(obj3.prototype) // undefined
console.log(Object.prototype.__proto__) // null
console.log(Object.__proto__) // {}
