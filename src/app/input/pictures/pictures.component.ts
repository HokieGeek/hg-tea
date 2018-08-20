import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hg-pictures',
    templateUrl: './pictures.component.html',
    styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {
    @Input() pictures: string[] = [];
    @Output() picturesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor() { }

    ngOnInit() {
    }

    addPicture() {
        this.pictures.push('');
    }
}
