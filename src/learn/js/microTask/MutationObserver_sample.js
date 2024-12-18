// MutationObserver 是一个浏览器原生提供的 API，用于监听 DOM 变化（如 DOM 元素的属性变化、子元素的变化等）。
// 它将回调函数推入微任务队列，并在检测到 DOM 变化时执行这些回调。

// 创建一个 MutationObserver 实例
const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        console.log('Mutation detected:', mutation);
    });
});

// 选择要观察的 DOM 元素
const targetNode = document.getElementById('myElement');

// 配置 MutationObserver，设置要观察哪些变动
const config = { childList: true, subtree: true };

// 启动观察
observer.observe(targetNode, config);

// 在 DOM 中添加新子元素
const newElement = document.createElement('div');
newElement.textContent = 'New child element';
targetNode.appendChild(newElement);

