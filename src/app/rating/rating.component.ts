import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hg-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() rating: number;
    @Input() max: number;

    constructor() { }

    ngOnInit() {
    }
}
