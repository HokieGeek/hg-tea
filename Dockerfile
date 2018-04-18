FROM nginx
RUN sed -i '/location \/ {/{n;n;s/.*/try_files $uri $uri\/ \/index.html;/}' /etc/nginx/conf.d/default.conf
COPY dist/* /usr/share/nginx/html/
