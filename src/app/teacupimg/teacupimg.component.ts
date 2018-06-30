import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hg-teacupimg',
  templateUrl: './teacupimg.component.html',
  styleUrls: ['./teacupimg.component.css']
})
export class TeacupimgComponent implements OnInit {
    @Input() selected = false;
    @Input() small = false;

    constructor() { }

    ngOnInit() {
    }
}
