import { Component, OnInit, Input } from '@angular/core';

import { Tea } from '../tea';

@Component({
  selector: 'hg-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent implements OnInit {
    @Input() tea: Tea;

    constructor() { }

    ngOnInit() {
    }

    get packagingNotLooseLeaf(): boolean {
        return this.tea.packaging != null && this.tea.packaging.toLowerCase() !== 'loose leaf';
    }

    get locationIsUrl(): boolean {
        const regexp = new RegExp('\.(com|net|org|us)/?');
        return regexp.test(this.tea.purchaselocation);
    }
}
