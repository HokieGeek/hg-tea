import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tea } from '../tea';
import { ViewService } from '../view.service';

@Component({
    selector: 'hg-database',
    templateUrl: 'database.component.html',
    styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() teas: Tea[] = [];
    private _processedTeas: Tea[] = [];
    private _teasPerPage = 35;
    private _currentPage = 1;

    constructor(private route: ActivatedRoute, public view: ViewService) { }

    ngOnInit() {
        /*
        this.route.paramMap.subscribe(params => {
            console.log('db', params.get('id'));
        });
        */
    }

    ngAfterViewInit() {
        this.view.changed.subscribe(() => this.updateTeas());
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateTeas();
    }

    get processedTeas(): Tea[] {
        return this._processedTeas;
    }

    get teasPerPage(): number {
        return this._teasPerPage;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get teasOnCurrentPage(): Tea[] {
        const start = this._teasPerPage * (this._currentPage - 1);
        const end = this._teasPerPage * this._currentPage;
        return this._processedTeas.slice(start, end);
    }

    updateTeas(): void {
        console.log('updateTeas()');
        this._processedTeas = this.teas
            .filter(t => this.view.filter.isMatch(t))
            .sort((t1, t2) => this.view.sorter.compare(t1, t2));
    }

    get numEntries(): number {
        return this._processedTeas.map(t => t.entries.length)
                                 .reduce((acc, num) => acc + num, 0);
    }

    get pages(): number {
        return Math.ceil(this._processedTeas.length / this._teasPerPage);
    }

    pageChange(p: number) {
        if (p !== this._currentPage) {
            this._currentPage = p;
        }
    }
}
