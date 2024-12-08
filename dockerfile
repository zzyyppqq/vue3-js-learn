# 设置基础镜像
FROM nginx
# 定义作者
# MAINTAINER zzyyppqq
LABEL maintainer="zzyyppqq@gmail.com"
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
# 暴露 Nginx 默认端口
EXPOSE 80
# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]


# -t 是给镜像取名。
# 最后有一个点 “.”，表示使用当前路径下的 dockerfile 文件，也可以指定使用其它路径的。
# 在项目根目录下运行以下命令以构建 Docker 镜像：
# docker build -t vue3-js-learn .