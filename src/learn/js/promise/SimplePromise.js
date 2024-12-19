//  [最简实现Promise，支持异步链式调用（20行）在面试的时候，经常会有面试官让你实现一个 Promise，如果参照 A - 掘金](https://juejin.cn/post/6844904094079926286)
function Promise(fn) {
    this.cbs = [];

    const resolve = (value) => {
        setTimeout(() => {
            this.data = value;
            this.cbs.forEach((cb) => cb(value));
        });
    }

    fn(resolve);
}

Promise.prototype.then = function (onResolved) {
    return new Promise((resolve) => {
        this.cbs.push(() => {
            const res = onResolved(this.data);
            if (res instanceof Promise) {
                res.then(resolve);
            } else {
                resolve(res);
            }
        });
    });
};


new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 500);
})
    .then((res) => {
        console.log(res);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, 500);
        });
    })
    .then(console.log);
