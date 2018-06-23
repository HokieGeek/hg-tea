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
    private processedTeas: Tea[] = [];
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

    get teasOnCurrentPage(): Tea[] {
        const start = this.teasPerPage * (this.currentPage - 1);
        const end = this.teasPerPage * this.currentPage;
        return this.processedTeas.slice(start, end);
    }

    updateTeas(): void {
        this.processedTeas = this.teas
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
        if (p !== this.currentPage) {
            this.currentPage = p;
        }
    }
}
