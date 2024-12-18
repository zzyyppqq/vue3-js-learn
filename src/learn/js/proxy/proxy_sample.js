
function defineReactive(obj, render) {
    return new Proxy(obj, {
        get(target, key) {
            // 监听属性的读取操作
            console.log(`Getting value of ${key}: ${target[key]}`);
            return target[key];
        },
        set(target, key, value) {
            if (!target.hasOwnProperty(key)) {
                console.log('新增了属性')
            }
            // 监听属性的修改操作
            console.log(`Setting value of ${key} to: ${value}`);
            target[key] = value;
            // 可以在这里触发视图更新的逻辑
            render(key, value);
            return true;
        },
        has(target, key) {
            console.log('Proxy has')
            return target.hasOwnProperty(key)
        },
        deleteProperty(target, p) {
            console.log('Proxy deleteProperty')
        },
        apply(target, thisArg, argArray) {
            console.log('Proxy apply')
        },

    });
}

let data = {
    name: 'zyp',
    method() {}
}

data = defineReactive(data, (key, value) => {
    console.log(`render UI [${key}, ${value}]`)
})

console.log(`data.name = ${data.name}`)
data.name = 'aaa'
console.log(`data.name = ${data.name}`)

// Proxy has
console.log('name' in data)
console.log('method' in data)
// 新增属性
data.age = 20
data.method()


const numbers = []
const proxy = new Proxy(numbers, {
    set(target, key, newValue, receiver) {
        target[key] = newValue
        return true
    },
    get(target, key, receiver) {
        return target[key]
    }
})
proxy.push(100)
console.log(numbers)



const userInfo = {
    name: 'zyp',
    gzh: 'zzyyppqq',
    sex: '男',
    age: 22
}
// 不能删除用户名和公众号
const readonlyKeys = ['name', 'gzh']
const proxyUserInfo = new Proxy(userInfo, {
    get(target, p, receiver) {
        // 获取属性的值或者修改属性的值都是通过直接操作target来实现的，
        // 但实际上ES6已经为我们提供了在Proxy内部调用对象的默认行为的API,即Reflect
        return Reflect.get(target, key, receiver)
        // return target[key]
    },
    set(target,key,value) {
        if(readonlyKeys.includes(key)) {
            throw new Error(`属性${key}不能被修改`)
        }
        target[key] = value
        return true
    },
    deleteProperty(target,key) {
        if(readonlyKeys.includes(key)) {
            throw new Error(`属性${key}不能被删除`)
            return
        }
        delete target[key]
        return true
    }
})

// 删除属性
// delete proxyUserInfo.name
delete proxyUserInfo.age
// 实际上Reflect的出现是为了让Object上面的操作更加规范，比如我们要判断某一个prop是否在一个对象中，通常会使用到in
console.log('name' in userInfo)
// 但上面的操作是一种命令式的语法，通过Reflect可以将其转变为函数式的语法
console.log(Reflect.has(userInfo, 'name'))
// 除了has,get之外，其实Reflect上面总共提供了十三个静态方法，
// 这十三个静态方法与Proxy的handler上面的十三个方法是一一对应的，
// 通过将Proxy与Reflect相结合，就可以对对象上面的默认操作进行拦截处理，
// 当然这也就属于函数元编程的范畴了。


