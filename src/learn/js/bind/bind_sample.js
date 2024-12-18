var obj = {
    name: "zyp",
    test: function (a, c) {
        console.log(this.name);
        console.log(a + c);
    }
}

const testFn = obj.test;

const callFn = testFn.call(obj, 1, 2);
console.log(callFn)

const applyFn = testFn.apply(obj, [1, 2]);
console.log(applyFn)

const bindFn = testFn.bind(obj, 1, 2)
console.log(bindFn) // 返回新的函数，但是不立即执行， 酷似call()
bindFn() // 执行函数