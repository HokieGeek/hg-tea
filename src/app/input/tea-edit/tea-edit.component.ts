import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tea, TeaBuilder } from '../../tea';

@Component({
    selector: 'hg-tea-edit',
    templateUrl: './tea-edit.component.html',
    styleUrls: ['./tea-edit.component.css']
})
export class TeaEditComponent implements OnInit {
    private _tea: Tea = null;

    @Input() cancelable = true;

    @Input()
    set tea(t: Tea) {
        this._tea = t;
    }

    get tea(): Tea {
        return this._tea;
    }

    @Output() updated: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    update() {
        this.updated.emit(new TeaBuilder()
            .from(this._tea)
            .build());
    }

    close() {
        this.canceled.emit(true);
    }
}
