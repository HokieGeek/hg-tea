import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hg-steep-time',
    templateUrl: './steep-time.component.html',
    styleUrls: ['./steep-time.component.css']
})
export class SteepTimeComponent implements OnInit {
    private _min = 0;
    private _sec = 0;

    @Input()
    set value(v: number) {
        this._min = Math.floor(v / 60);
        this._sec = v - (this._min * 60);
        console.log('set value(' + v + ')', this._min, this._sec);
    }

    get value(): number {
        console.log('get value', this._min, this._sec);
        return (+this._min * 60) + +this._sec;
    }

    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

    set min(t: number) {
        if (t !== this._min) {
            this._min = t;
            this.valueChange.emit(this.value);
        }
    }

    get min(): number {
        return this._min;
    }

    set sec(t: number) {
        if (t !== this._sec) {
            this._sec = t;
            this.valueChange.emit(this.value);
        }
    }

    get sec(): number {
        return this._sec;
    }

    constructor() { }

    ngOnInit() {
    }
}
