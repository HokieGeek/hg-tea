import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'teacupimg',
  templateUrl: './teacupimg.component.html',
  styleUrls: ['./teacupimg.component.css']
})
export class TeacupimgComponent implements OnInit {
    @Input() unselect: string

    constructor() { }

    ngOnInit() {
    }
}