import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // Needed because this will run in a browser

import { AppComponent }   from './app.component' // Obivously, this is app.component.ts

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ], // AppComponent is the name of the class in app.component.ts
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
