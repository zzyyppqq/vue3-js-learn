// -------- 使用对象字面量创建单例 ---------
const singleton0 = {
    name: "Singleton",
    getName() {
        return this.name;
    }
};

// 访问单例实例
console.log(singleton0.getName()); // "Singleton"

// ------ 使用闭包创建单例 -------
const Singleton1 = (function() {
    let instance;

    function createInstance() {
        return {
            name: "Singleton",
            getName() {
                return this.name;
            }
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


// 获取单例实例
const instance1 = Singleton1.getInstance();
const instance2 = Singleton1.getInstance();

console.log(instance1 === instance2); // true, 两个实例是相同的
console.log(instance1.getName()); // "Singleton"

// ------------- 使用 ES6 类创建单例 -----------
class Singleton {
    // static instance
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }

        this.name = "Singleton";
        //将this挂载到Singleton这个类的instance属性上
        Singleton.instance = this; // 保持唯一实例
    }

    getName() {
        return this.name;
    }
}

// 获取单例实例
const instance11 = new Singleton();
const instance22 = new Singleton();

console.log('class: ',instance11 === instance22); // true, 两个实例是相同的
console.log(instance11.getName()); // "Singleton"