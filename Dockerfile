FROM node:6-onbuild

RUN npm run typings install

EXPOSE 3000
