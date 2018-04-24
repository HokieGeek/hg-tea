import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HgTeaComponent } from './hgtea.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'tea',  component: HgTeaComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
