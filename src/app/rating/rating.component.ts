import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hg-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    private range: number[] = [];
    private ratingValue: number;
    @Input() editable = false;

    @Input()
    set rating(r: number) {
        this.ratingValue = r;
        this.ratingChange.emit(this.ratingValue);
    }

    get rating(): number {
        return this.ratingValue;
    }

    @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

    private clickedRating(r: number) {
        if (this.editable) {
            if (this.rating === r) {
                this.rating = 0;
            } else {
                this.rating = r;
            }
        }
    }

    @Input()
    set max(m: number) {
        this.range = Array(+m).fill(0).map((x, i) => i + 1);
    }

    get max(): number {
        return this.range.length;
    }

    constructor() { }

    ngOnInit() {
    }
}
