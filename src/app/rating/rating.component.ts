import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hg-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    private range: number[] = [];
    @Input() _rating: number;
    @Input() editable = false;

    @Input()
    set rating(r: number) {
        this._rating = r;
        this.valueChange.emit(this._rating);
    }

    get rating(): number {
        return this._rating;
    }

    @Output() valueChange:EventEmitter<number> = new EventEmitter<number>();

    @Input()
    set max(m: number) {
        this.range = Array(+m).fill(0).map((x,i) => i+1);
    }

    get max(): number {
        return this.range.length;
    }

    constructor() { }

    ngOnInit() {
    }
}
