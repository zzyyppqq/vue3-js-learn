
// Object.defineProperty()静态方法直接在对象上定义新属性，或修改对象上的现有属性并返回该对象
// 在Vue2.0中，数据双向绑定就是通过Object.defineProperty去监听对象的每一个属性，
// 然后在get,set方法中通过发布订阅者模式来实现的数据响应，但是存在一定的缺陷，
// 比如只能监听已存在的属性，对于新增删除属性就无能为力了，同时无法监听数组的变化，
// 所以在Vue3.0中将其换成了功能更强大的Proxy。

/**
 * interface PropertyDescriptor {
 *     configurable?: boolean;
 *     enumerable?: boolean;
 *     value?: any;
 *     writable?: boolean;
 *     get?(): any;
 *     set?(v: any): void;
 * }
 */
function defineReactive1(obj, key, curValue) {
    Object.defineProperty(obj, 'name', {
        // value: '',
        // writable: true,
        get() {
            console.log(`get ${curValue}`)
            return curValue
        },
        set(value) {
            console.log(`set ${value}`)
            curValue = value
        }
    })
}
function defineReactive2(obj, key) {
    let curValue = obj[key]
    Object.defineProperty(obj, 'name', {
        get() {
            console.log(`get ${curValue}`)
            return curValue
        },
        set(value) {
            console.log(`set ${value}`)
            curValue = value
        }
    })
}
const obj = {
    name: 'zyp',
}
const key = 'name'
// defineReactive1(obj, key, obj[key])
function watch(obj, key) {
    defineReactive1(obj, key, obj[key])
}
watch(obj, 'name')

console.log(obj.name)
obj.name = '111'
console.log(obj.name)

console.log("============================================")


// vue2 Object.defineProperty实现双向绑定
function defineReactive(obj, key, value, render) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`Getting value of ${key}:`, value);
            return value;
        },
        set(newValue) {
            console.log(`Setting value of ${key} to:`, newValue);
            if (newValue !== value) {
                value = newValue;
                // 这里可以触发视图更新的逻辑（例如调用更新函数）
                render(key, value)
            }
        }
    });
}

function observe(obj, render) {
    if (typeof obj !== 'object' || obj === null) return;

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key], render);
    });
}

// 创建一个对象并使其可响应
let data = { message: "Hello, Vue!" };
observe(data, () => {
    console.log('render UI')
});

// 测试双向绑定
console.log(data.message); // Getting value of message: Hello, Vue!
data.message = "Hello, Vue 3!"; // Setting value of message to: Hello, Vue 3!
console.log(data.message); // Getting value of message: Hello, Vue 3!


