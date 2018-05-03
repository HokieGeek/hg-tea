import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
    selector: 'hg-database-entry-images',
    templateUrl: './database-entry-images.component.html',
    styleUrls: ['./database-entry-images.component.css']
})
export class DatabaseEntryImagesComponent implements OnInit {
    @Input() tea: Tea;

    constructor() { }

    ngOnInit() {
    }
}
