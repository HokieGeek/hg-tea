import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HgTeaComponent } from './hgtea.component';

const routes: Routes = [
    { path: '', redirectTo: '/db', pathMatch: 'full' },
    { path: 'db', component: HgTeaComponent },
    // { path: ':id', component: HgTeaComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
