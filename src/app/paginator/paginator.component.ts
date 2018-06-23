import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hg-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
    public range: number[] = [];
    public currentPage = 1;

    @Input()
    set pages(n: number) {
        this.range = Array(+n).fill(0).map((x, i) => i + 1);
    }

    @Input()
    set current(p: number) {
        if (p !== this.currentPage) {
            this.currentPage = p;
            this.change.emit(this.currentPage);
        }
    }

    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }
}
