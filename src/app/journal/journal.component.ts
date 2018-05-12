import { Component, OnInit, AfterViewInit, Input, Renderer2 } from '@angular/core';

import { Tea } from '../tea';
import { Entry } from '../entry';

@Component({
    selector: 'hg-journal',
    templateUrl: 'journal.component.html',
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit, AfterViewInit {
    @Input() teaId: number;
    @Input() entries: Entry[];
    private expanded = false;
    private collapseButtonText: string = 'more';

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
    }


    ngAfterViewInit() {
        /*
        if (this.entries.length > 1) {
            // this.collapseButtonText = String(this.entries.length - 1) + ' more';
            $('#moreEntries-'+this.teaId)
                .on('shown.bs.collapse', () {
                    console.log('shown');
                    this.collapseButtonText = 'less';
                })
                .on('hidden.bs.collapse', () {
                    console.log('hidden');
                    this.collapseButtonText = String(this.entries.length - 1) + ' more';
                });
            // $('#moreEntries-'+this.teaId)
        }
        */
    }

    get sortedEntries() {
        if (this.entries) {
            return this.entries.slice().reverse();
        }
        return [];
    }

    entriesToggle() {
        $('#moreEntries-'+this.teaId).collapse(this.expanded ? 'hide' : 'show');
        // const el = this.renderer.selectRootElement('#moreEntries-'+this.teaId);
        // el.collapse(this.expanded ? 'hide' : 'show');
        this.expanded = !this.expanded;
        // console.log(el);
    }
}
