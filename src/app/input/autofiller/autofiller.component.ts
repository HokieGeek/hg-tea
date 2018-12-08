import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'hg-autofiller',
    templateUrl: './autofiller.component.html',
    styleUrls: ['./autofiller.component.css']
})
export class AutofillerComponent implements OnInit {
    @Input() placeholder: string;
    @Input() values: string[];

    private val: string;

    @Input()
    set model(v: string) {
        this.val = v;
        this.modelChange.emit(this.val);
    }

    get model(): string {
        return this.val;
    }

    @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

    search = (text$: Observable<string>) =>
        text$.pipe(
           debounceTime(200),
           distinctUntilChanged(),
           map(t => this.values.filter(v => v.toLowerCase().indexOf(t.toLowerCase()) > -1).slice(0, 20))
        )

    constructor() { }

    ngOnInit() {
    }
}
