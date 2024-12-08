# 备份原代码
tar -zcvf gentle-vue.tar ./gentle-vue

# 删除原代码文件夹
rm -rf gentle-vue

# 拉取代码
git clone https://gitee.com/FJ_WoMenDeShiJie/gentle-vue.git
echo -e "\033[32m\n代码拉取\n\033[0m"

# 拷贝 node_modules
cp ./node.tar ./gentle-vue

# build 打包 vue 项目，生成 dist 文件夹
cd ./gentle-vue
tar -zxvf node.tar
npm run build
echo -e "\033[32m\nvue项目打包完成\n\033[0m"

# 删除原镜像
docker rmi gentle-vue &> /dev/null
echo  -e "\033[32m\n删除原镜像文件\n\033[0m"

# 拷贝 dockerfile 到工程目录下
cp ../dockerfile ./

# 构建镜像
docker build -t gentle-vue .
echo -e "\033[32m\n新镜像构建成功\n\033[0m"

# 删除原容器
docker rm -f gentle-vue

# 启动容器
docker run -p 3000:80 -d --name gentle-vue gentle-vue
echo -e "\033[32m\n前端工程部署完成\n\033[0m"