import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tea, Entry } from '../../tea';

@Component({
    selector: 'hg-unrated',
    templateUrl: './unrated.component.html',
    styleUrls: ['./unrated.component.css']
})
export class UnratedComponent implements OnInit {
    @Input() tea: Tea;
    @Input() entry: Entry;
    @Output() rated: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {
    }

    get rating(): number {
        return 0;
    }

    set rating(rating: number) {
        if (rating !== 0) {
            this.rated.emit(rating);
        }
    }
}
