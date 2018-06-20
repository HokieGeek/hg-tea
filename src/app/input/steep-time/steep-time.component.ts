import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'hg-steep-time',
    templateUrl: './steep-time.component.html',
    styleUrls: ['./steep-time.component.css']
})
export class SteepTimeComponent implements OnInit {
    private steeptime = '';

    @Input()
    set value(t: string) {
        if (t !== this.steeptime) {
            this.steeptime = t;
            // this.steeptime = t.replace(/m? /, "m ").replace(/s?$/, "s");
            // this.steeptime = t.replace(/(m|s)/g, "").replace(/ /, "m ").replace(/$/, "s");
            this.valueChange.emit(this.steeptime);
        }
    }

    get value(): string {
        return this.steeptime;
    }

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

}
