FROM node:6-onbuild

RUN npm run typings install

RUN sed -i "/@NgModule/i\
import { enableProdMode } from '@angular/core';\n\
enableProdMode();\n\
" app/app.module.ts

EXPOSE 3000
