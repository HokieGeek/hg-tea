import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hg-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() rating: number = Math.random() * 4;
    @Input() max: number = 4;

    constructor() { }

    ngOnInit() {
    }
}
