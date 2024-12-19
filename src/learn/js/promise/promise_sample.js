import {MyPromise} from "./MyPromise.js";

new Promise((resolve, reject) => {
    // resolve('no')
    return new Promise((resolve, reject) => {
        resolve('ok')
    })
}).then(res => {
    console.log(res)
}).catch(err  => {
    console.log(err)
})



// order 手动控制测试用例类型
const order = 1
switch (order) {
    // 测试用例1:测试 resolve,then 和 catch
    case 1:
        new MyPromise((resolve, reject) => {
            resolve('这是第一个 resolve 值')
        }).then((data) => {
            console.log(data) //会打印'这是第一个 resolve 值'
            return '这是第二个 resolve 值'
        }).then(data => {
            console.log(data)
            throw ('这是reject 值')
        }).catch((err) => {
            console.log(err)
        })
        break

    // 测试用例 2:测试静态方法resolve 和 reject
    case 2:
        MyPromise.resolve('这是静态方法的第一个 resolve 值').then((data) => {
            console.log(data) // 会打印'这是静态方法的第一个 resolve 值'
        })
        MyPromise.reject('这是静态方法的第一个 reject 值').then((data) => {
        }).catch(err => {
            console.log(err) //会打印'这是静态方法的第一个 reject 值'
        })
        break

    // 测试用例 3:测试静态方法all,race
    case 3:
        const pOne = new MyPromise((resolve, reject) => {
            resolve(1);
        });

        const pTwo = new MyPromise((resolve, reject) => {
            resolve(2);
        });

        const pThree = new MyPromise((resolve, reject) => {
            resolve(3);
        });

        MyPromise.all([pOne, pTwo, pThree]).then(data => {
            console.log(data); // [1, 2, 3] 正常执行完毕会执行这个,结果顺序和promise实例数组顺序是一致的
        }, err => {
            console.log(err); // 任意一个报错信息
        });

        MyPromise.race([pOne, pTwo, pThree]).then(data => {
            console.log(data); // 1 正常执行完毕会执行这个,结果顺序和promise实例数组顺序是一致的
        }, err => {
            console.log(err); // 任意一个报错信息
        });
        break

    // 测试用例 4 finally 和 done
    case 4:
        MyPromise.resolve('这是静态方法的第一个 resolve 值').finally(() => {
            console.log('resolve 的finally')
        })
        MyPromise.reject('这是静态方法的第一个 reject 值').catch(err => {
            console.log(err)
        }).finally(() => {
            console.log('reject 的finally')
        })
        MyPromise.resolve('这是静态方法的第一个 resolve 值').then(() => {
            return '这是静态方法的第二个 resolve 值'
        }).then(() => {
            throw ('这是静态方法的第一个 reject 值')
            return '这是静态方法的第二个 resolve 值'
        }).done()
        break

    default:

        break
}