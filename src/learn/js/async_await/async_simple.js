// [手写async await的最简实现（20行）如果让你手写async函数的实现，你是不是会觉得很复杂？这篇文章带你用20 - 掘金](https://juejin.cn/post/6844904102053281806)
function asyncToGenerator(generatorFunc) {
    return function() {
        const gen = generatorFunc.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult
                try {
                    generatorResult = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }
                const { value, done } = generatorResult
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
                }
            }
            step("next")
        })
    }
}


const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

const test0 = async () => {
    const data = await getData()
    console.log('data: ', data);
    const data2 = await getData()
    console.log('data2: ', data2);
    return 'success'
}
test0().then(res => console.log(res))

// 使用asyncToGenerator实现和async、await一样的效果
var test = asyncToGenerator(
    function* testG() {
        // await被编译成了yield
        const data = yield getData()
        console.log('data: ', data);
        const data2 = yield getData()
        console.log('data2: ', data2);
        return 'success'
    }
)

test().then(res => console.log(res))

