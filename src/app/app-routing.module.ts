import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeasComponent } from './teas/teas.component';
import { TeaComponent } from './tea/tea.component';
import { InputComponent } from './input/input.component';
import { StatsComponent } from './stats/stats.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'db', component: TeasComponent },
    { path: 'tea/:id', component: TeaComponent },
    { path: 'input', component: InputComponent },
    { path: 'stats', component: StatsComponent },

    { path: '', redirectTo: '/db', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
