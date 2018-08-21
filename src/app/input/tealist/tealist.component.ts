import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tea } from '../../tea';

@Component({
    selector: 'hg-tealist',
    templateUrl: './tealist.component.html',
    styleUrls: ['./tealist.component.css']
})
export class TealistComponent implements OnInit {
    @Input() teas: Tea[] = null;
    @Input() id = "";

    @Output() selected: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    selectTea(tea: Tea) {
        this.selected.emit(tea);
    }

    createNew() {
        this.create.emit(true);
    }
}
