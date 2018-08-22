import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hg-pictures',
    templateUrl: './pictures.component.html',
    styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {
    @Input() pictures: string[] = [];
    @Output() picturesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    getPicture(idx: number): string {
        return this.pictures[idx];
    }

    setPicture(idx: number, val: string) {
        this.pictures[idx] = val.replace(/=w.*$/, '');
    }

    constructor() { }

    ngOnInit() {
    }

    add() {
        this.pictures.push('');
    }

    remove(idx: number) {
        this.pictures.splice(idx, 1);
    }

    sortDown(idx: number) {
        this.pictures.splice(idx + 2, 0, this.pictures[idx]);
        this.pictures.splice(idx, 1);
    }

    sortUp(idx: number) {
        this.pictures.splice(idx - 1, 0, this.pictures[idx]);
        this.pictures.splice(idx + 1, 1);
    }
}
