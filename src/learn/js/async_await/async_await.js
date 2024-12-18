
function spawn(genF) { //spawn函数就是自动执行器，跟简单版的思路是一样的，多了Promise和容错处理
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch(e) {
                return reject(e);
            }
            if(next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function(v) {
                step(function() { return gen.next(v); });
            }, function(e) {
                step(function() { return gen.throw(e); });
            });
        }
        step(function() { return gen.next(undefined); });
    });
}


async function fn0(args) {
    // ...
    console.log('1111')
    return 'aaa'
}

const result = await fn0()
console.log(result)

// await等价于
function fn(args) {
    return spawn(function* () {
        console.log('2222')
        return "bbb"
    });
}

fn().then(res => {
    console.log(res)
})