import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'hg-sorter',
    templateUrl: './sorter.component.html',
    styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {
    private _teas: Tea[];

    constructor() { }

    ngOnInit() {
    }

    get teas(): Tea[] {
        return this._teas;
    }

    @Input()
    set teas(_teas) {
        this._teas = _teas;
    }
}
