import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hg-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
    private _range: number[] = [];
    private _currentPage = 1;

    get range(): number[] {
        return this._range;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    @Input()
    set pages(n: number) {
        this._range = Array(+n).fill(0).map((x, i) => i + 1);
    }

    @Input()
    set current(p: number) {
        if (p !== this._currentPage) {
            this._currentPage = p;
            this.change.emit(this._currentPage);
        }
    }

    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }
}
