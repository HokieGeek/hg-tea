import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HgTea }    from './hgtea.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'tea',  component: HgTea },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
