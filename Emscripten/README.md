# 在 macOS 上安装 Emscripten

Emscripten 是一个将 C/C++ 编译为 WebAssembly 和 JavaScript 的工具链。以下是 macOS 上安装和配置 Emscripten 的详细步骤。

1. 系统要求
   macOS 系统（支持 Intel 和 Apple Silicon）
   必要工具：git 和 python3
   使用以下命令安装：
   bash
   复制代码
   xcode-select --install   # 安装命令行工具
   brew install git python3 # 通过 Homebrew 安装 git 和 python3
2. 安装 Emscripten SDK
   步骤 1: 克隆 Emscripten SDK 仓库
   在终端运行以下命令以下载 Emscripten SDK：

git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
步骤 2: 安装最新版本的 Emscripten
运行以下命令安装最新版本的 Emscripten 工具链：

./emsdk install latest
./emsdk activate latest
install 命令会下载并安装所需的工具链（包括 Emscripten、Node.js 和 LLVM）。
activate 命令会将安装的工具链设置为默认版本。
步骤 3: 配置环境变量
加载 Emscripten 环境变量：

source ./emsdk_env.sh
为了使环境变量永久生效，可以将以下内容添加到 ~/.zshrc 或 ~/.bash_profile 文件中：

export PATH="$HOME/emsdk:$PATH"
export PATH="$HOME/emsdk/node/12.18.1_64bit/bin:$PATH"
export PATH="$HOME/emsdk/upstream/emscripten:$PATH"
然后运行：

source ~/.zshrc  # 或 source ~/.bash_profile
3. 验证安装
   验证 Emscripten 是否安装成功：

emcc --version
如果看到 Emscripten 的版本信息，则安装成功。

4. 编译一个简单示例
   创建一个测试文件 hello.c：

#include <stdio.h>
int main() {
printf("Hello, WebAssembly!\n");
return 0;
}
编译为 WebAssembly 和 HTML：

emcc hello.c -o hello.html
启动本地服务器运行 HTML 文件：

emrun hello.html
Emscripten 自带的 emrun 工具会启动一个本地 Web 服务器并打开浏览器运行。

5. 常用命令
   查看已安装的工具链：
   bash
   复制代码
   ./emsdk list
   安装特定版本：
   bash
   复制代码
   ./emsdk install 3.1.8
   ./emsdk activate 3.1.8
   更新 SDK：
   bash
   复制代码
   git pull
   ./emsdk install latest
   ./emsdk activate latest
6. 常见问题
1. 安装时出现权限问题
   确保使用非 root 用户，并正确设置文件权限：

sudo chown -R $(whoami) ~/emsdk
2. 编译时缺少 emcc 命令
   检查环境变量是否正确加载。如果没有加载，可以手动运行：

source ./emsdk_env.sh
3. Apple Silicon (M1/M2) 用户问题
   对于 Apple Silicon 用户，Emscripten 工具链可能会遇到兼容性问题，建议使用 Rosetta 运行：

arch -x86_64 emcc --version
7. 参考资料
   官方文档：Emscripten 入门指南
   常见问题解答：Emscripten FAQ
   通过以上步骤，您可以在 macOS 上成功安装和运行 Emscripten，并将 C/C++ 项目编译为 WebAssembly。