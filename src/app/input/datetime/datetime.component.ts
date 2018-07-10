import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hg-datetime',
    templateUrl: './datetime.component.html',
    styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements OnInit {
    private _value = new Date();

    public hour12 = false;

    @Input() type = 'both';

    @Input()
    set value(v: Date) {
        this._value = v;
        this.valueChange.emit(this._value);
    }

    get value(): Date {
        return this._value;
    }

    @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();

    constructor() { }

    ngOnInit() {
    }
}
