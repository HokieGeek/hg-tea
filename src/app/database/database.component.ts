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
    private currentPage = 1;
    private teasPerPage = 30;

    constructor(private route: ActivatedRoute, public view: ViewService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            console.log('db', params.get('id'));
        });
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

    updateTeas(): void {
        console.log('updateTeas()');
        this._processedTeas = this.teas
            .filter(t => this.view.filter.isMatch(t))
            .sort((t1, t2) => this.view.sorter.compare(t1, t2));
    }

    get numEntries(): number {
        return this.processedTeas.map(t => t.entries.length)
                                 .reduce((acc, num) => acc + num, 0);
    }

    get pages(): number {
        return Math.ceil(this.processedTeas.length / this.teasPerPage);
    }

    pageChange(p: number) {
        console.log('Setting page to....', p);
        this.currentPage = p;
    }
}
