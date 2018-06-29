import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Tea, Entry } from '../../../tea';
import { TeaDbService } from '../../../teadb.service';

class UnratedEntry {
    constructor(public teaId: number, public entryId: Date, public rating: number) { }
}

@Component({
    selector: 'hg-unrated',
    templateUrl: './unrated.component.html',
    styleUrls: ['./unrated.component.css']
})
export class UnratedComponent implements OnInit {
    private unratedEntries: Map<Date, Tea> = new Map<Date, Tea>();
    // private unratedName: string[]

    @Input()
    set teas(_teas: Tea[]) {
        for (const t of _teas) {
            for (const e of t.entries) {
                if (e.rating === 0) {
                    this.unratedEntries.set(e.datetime, t);
                }
            }
        }

            /*
        this.unratedEntries.forEach((v,k) => {
            console.log(k, v.entry(k));
            // console.log(v.name, moment
        });
             */
    }

    @Output() rated: EventEmitter<UnratedEntry> = new EventEmitter<UnratedEntry>();

    constructor() {}

    ngOnInit() {
    }

    unratedEntryDisplayName(entry: Date): string {
        const tea = this.unratedEntries.get(entry);
        return tea.name + ' ';
    }

    test() {
        console.log('gest');
    }

    applyRating(tea: Tea, entry: Date, rating: number) {
        // Send event
        this.rated.emit(new UnratedEntry(tea.id, entry, rating));

        // Remove from list
        this.unratedEntries.delete(entry);
    }
}
