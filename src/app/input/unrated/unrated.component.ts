import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tea, Entry, EntryBuilder } from '../../tea';

import { SteeptimePipe } from '../../steeptime.pipe';

@Component({
    selector: 'hg-unrated',
    templateUrl: './unrated.component.html',
    styleUrls: ['./unrated.component.css']
})
export class UnratedComponent implements OnInit {
    @Input() tea: Tea;
    @Input() entry: Entry;
    @Output() updated: EventEmitter<Entry> = new EventEmitter<Entry>();

    public comments: string;

    constructor() {}

    ngOnInit() {
    }

    get rating(): number {
        return 0;
    }

    set rating(rating: number) {
        if (rating !== 0) {
            this.updated.emit(new EntryBuilder()
                .from(this.entry)
                .rating(rating)
                .comments(this.comments)
                .build());
        }
    }
}
