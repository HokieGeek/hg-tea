FROM node:6-onbuild

EXPOSE 3000

## Install typings
RUN npm run typings install

## Mark as a production angular app
RUN sed -i "/@NgModule/i\
import { enableProdMode } from '@angular/core';\n\
enableProdMode();\n\
" app/app.module.ts

## Install serve
RUN npm install serve
RUN sed -i '/^[ \t]*"scripts": /a\
    "serve": "serve",' package.json

CMD ["npm", "run", "serve"]
