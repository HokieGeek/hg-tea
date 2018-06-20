import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hg-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() _rating: number;
    @Input() max: number;
    @Input() clickable = false;

    @Input()
    set rating(r: number) {
        this._rating = r;
    }

    get rating(): number {
        return this._rating;
    }

    constructor() { }

    ngOnInit() {
    }
}
