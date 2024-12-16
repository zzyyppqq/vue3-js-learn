# 编译为 WebAssembly 和 HTML：
emcc hello.c -o hello.html
# 启动本地服务器运行 HTML 文件：
# Emscripten 自带的 emrun 工具会启动一个本地 Web 服务器并打开浏览器运行。
emrun hello.html