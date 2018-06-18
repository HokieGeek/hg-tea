import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeasComponent } from './teas/teas.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
    { path: '', redirectTo: '/db', pathMatch: 'full' },
    { path: 'db', component: TeasComponent },
    { path: 'input', component: InputComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
