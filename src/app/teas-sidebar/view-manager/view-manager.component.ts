import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ViewService } from '../../view.service';

@Component({
    selector: 'hg-view-manager',
    templateUrl: './view-manager.component.html',
    styleUrls: ['./view-manager.component.css']
})
export class ViewManagerComponent implements OnInit, AfterViewInit {
    public enableClear = false;
    public enableApply = false;

    constructor(public view: ViewService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.view.applied.subscribe(() => this.enableApply = false);
        this.view.changed.subscribe(cleared => this.enableClear = this.enableApply = !cleared);
    }

    get viewUrl(): string {
        return '/db?' + this.view.generateUrlParams(); // TODO
    }

    loadDefaultView(name: string) {
        this.view.loadDefaultView(name);
        this.view.apply();
    }

    loadUserView(name: string) {
        this.view.loadUserView(name);
        this.view.apply();
    }
}
