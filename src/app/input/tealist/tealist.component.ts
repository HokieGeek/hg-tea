import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tea } from '../../tea';

@Component({
    selector: 'hg-tealist',
    templateUrl: './tealist.component.html',
    styleUrls: ['./tealist.component.css']
})
export class TealistComponent implements OnInit {
    @Input() stockedTeas: Tea[] = null;
    @Input() noLongerStockedTeas: Tea[] = null;

    public listStocked = true;

    get teas(): Tea[] {
        return this.listStocked ? this.stockedTeas : this.noLongerStockedTeas;
    }

    @Output() selected: EventEmitter<Tea> = new EventEmitter<Tea>();

    constructor() { }

    ngOnInit() {
    }

    selectTea(tea: Tea) {
        this.selected.emit(tea);
    }
}
