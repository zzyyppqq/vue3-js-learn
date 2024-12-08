# [Ubuntu 22.04下Docker安装（最全指引）](https://blog.csdn.net/u011278722/article/details/137673353)
# [docker部署、nginx挂载、nginx.conf配置文件](https://www.cnblogs.com/jouncy/p/16166122.html)

# 查询所有容器
docker ps -a
#删除指定容器
docker rm 容器id

docker inspect 容器id  #查看镜像的元数据
docker exec 		#进入当前容器后开启一个新的终端，可以在里面操作。（常用）
docker attach 容器id		# 进入容器正在执行的终端
docker cp 容器id:容器内路径  主机目的路径	#从容器内拷贝到主机上
# 进入到容器里
docker exec -it nginx-manager bash

# docker run: 这个命令用于创建一个新的容器并运行它。
# --name nginx-manager: 这个选项为容器指定一个名称。 使用名称可以更容易地管理和引用容器，例如使用 docker stop nginx-manager 停止容器。
# -d: 这个选项表示在后台运行容器 (detached mode)。 如果没有这个选项，容器将在前台运行，并占用终端。
# nginx: 这是要运行的镜像的名称。 Docker 会尝试从本地镜像库中查找名为 nginx 的镜像。 如果本地没有该镜像，Docker 会从 Docker Hub (默认的镜像仓库) 下载 nginx 镜像。
docker run --name nginx-manager -d nginx
docker stop nginx-manager
docker rm nginx-manager

docker cp nginx-manager:/etc/nginx/nginx.conf /home/firefly/dockers/nginx/conf/
docker cp nginx-manager:/etc/nginx/conf.d/default.conf /home/firefly/dockers/nginx/conf

#备份
cp default.conf default.bak.conf
cp nginx.conf nginx.bak.conf

# --privileged
#  使用该参数，[container]内的root拥有真正的root权限。
#  否则，container内的root只是外部的一个普通用户权限。
#  privileged启动的容器，可以看到很多host上的设备，并且可以执行mount。
#  甚至允许你在docker容器中启动docker容器。
# --name 设置nginx容器的名称
# -p 8193:8193
#  8192:80: 将主机端口 8192 映射到容器端口 80。 这意味着访问主机的 8192 端口将转发到容器的 80 端口，也就是 Nginx 的 HTTP 端口。
#  设置访问端口和nginx容器的监听端口的映射关系
#  第一个8193是你访问的端口
#  第二个8193是docker的nginx配置文件监听端口
# -v 将本地文件挂载到docker容器nginx的配置文件目录、日志目录、服务访问目录，
#  使用了 -v 选项进行卷挂载，容器内的 Nginx 将使用你挂载的本地配置文件和网站文件，容器中原有的配置文件会被覆盖。
# -d 后台挂载运行nginx

docker run --privileged --name nginx-manager -it -p 8192:8192 \
-v /home/firefly/dockers/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
-v /home/firefly/dockers/nginx/conf/default.conf:/etc/nginx/conf.d/default.conf:ro \
-v /home/firefly/dockers/nginx/html:/usr/share/nginx/html:rw \
-v /home/firefly/dockers/nginx/log:/var/log/nginx \
-d nginx

docker run --name nginx-manager -it -p 8192:80 \
-v /home/firefly/dockers/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro \
-v /home/firefly/dockers/nginx/conf/default.conf:/etc/nginx/conf.d/default.conf:ro \
-v /home/firefly/dockers/nginx/html:/usr/share/nginx/html:rw \
-v /home/firefly/dockers/nginx/log:/var/log/nginx \
-d nginx

# 查看容器的状态
docker inspect nginx-manager