FROM nginx
RUN echo 'try_files $uri $uri/ /index.html;' >> /etc/nginx/nginx.conf
COPY dist/* /usr/share/nginx/html/
