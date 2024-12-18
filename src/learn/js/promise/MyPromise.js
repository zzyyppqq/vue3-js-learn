// [JS 高级之手写一个Promise,Generator,async和 await](https://juejin.cn/post/6844904022223110151?searchId=2024121816374357D27255FC66374B5246)
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

export class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise构造参数必须是一个函数')
        }
        this._status = PENDING
        this._value = undefined
        // 由于 then 方法支持多次调用，我们可以维护两个数组，将每次 then 方法注册时的回调函数添加到数组中，
        // 等待执行 在初级的基础上加入成功回调函数队列和失败回调队列和then方法
        this._fulfilledQueues = [] //成功回调函数队列
        this._rejectedQueues = [] //失败回调函数队列

        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }

    _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) return
            this._status = FULFILLED
            const runFulfilled = (value) => {
                let cb;
                // shift()方法从数组中删除第一个元素并返回该删除的元素。该方法改变数组的长度
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            const runRejected = (err) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(err)
                }
            }
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value
                    runFulfilled(value)
                }, err => {
                    this._value = err
                    runRejected(err)
                })
            } else {
                this._value = val
                runFulfilled(val)
            }
        }
        queueMicrotask(run)
        //setTimeout(run, 0)
    }

    _reject(err) {
        if (this._status !== PENDING) return
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        queueMicrotask(run)
        // setTimeout(run, 0)
    }

    then(onFulfilled, onRejected) {
        const {_value, _status} = this

        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    static reject(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise((resolve, reject) => reject(value))
    }

    static all(list) {
        return new MyPromise((resolve, reject) => {
            let values = []
            let count = 0
            for (let [i, p] of list.entries) {
                this.resolve(p).then(res => {
                    values[i] = res
                    count++
                    if (count === list.length) resolve(values)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static race(list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => {
                throw reason
            })
        )
    }

    done(onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected)
            .catch((reason) => {
                console.log('reason', reason)
                // 抛出一个全局错误
                throw (`错误为: ${reason}`)
            })
    }
}

