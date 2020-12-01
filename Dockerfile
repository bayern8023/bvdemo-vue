FROM nginx

ENV PORT 80
EXPOSE 80

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
#COPY dist/  /usr/share/nginx/html/
COPY . /usr/share/nginx/html