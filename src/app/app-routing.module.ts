import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeasComponent } from './teas/teas.component';

const routes: Routes = [
    { path: '', redirectTo: '/db', pathMatch: 'full' },
    { path: 'db', component: TeasComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
