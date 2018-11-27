import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ViewService } from '../../view.service';

@Component({
    selector: 'hg-view-manager',
    templateUrl: './view-manager.component.html',
    styleUrls: ['./view-manager.component.css']
})
export class ViewManagerComponent implements OnInit, AfterViewInit {
    public enableClear = false;
    public enableApply = false;
    private url_route: string = null;

    constructor(public view: ViewService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.url.subscribe(url => this.url_route = url[0].path);
    }

    ngAfterViewInit() {
        this.view.applied.subscribe(() => this.enableApply = false);
        this.view.changed.subscribe(cleared => this.enableClear = this.enableApply = !cleared);
    }

    get hasViewUrl(): boolean {
        return this.url_route != null;
    }

    get viewUrl(): string {
        return '/' + this.url_route + '?' + this.view.generateUrlParams();
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
