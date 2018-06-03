import { Component, OnInit } from '@angular/core';

import { ViewService } from '../../view.service';

@Component({
    selector: 'hg-view-manager',
    templateUrl: './view-manager.component.html',
    styleUrls: ['./view-manager.component.css']
})
export class ViewManagerComponent implements OnInit {
    constructor(public view: ViewService) { }

    ngOnInit() {
    }

    save() {
        this.view.save('foobar');
    }
}
