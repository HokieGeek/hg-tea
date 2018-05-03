import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DatabaseEntryImagesComponent } from './database-entry-images.component';

import { TestUtils } from '../test-utils';

describe('DatabaseEntryImagesComponent', () => {
    let component: DatabaseEntryImagesComponent;
    let fixture: ComponentFixture<DatabaseEntryImagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DatabaseEntryImagesComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatabaseEntryImagesComponent);
        component = fixture.componentInstance;

        const id = TestUtils.createRandomId();
        component.tea = TestUtils.createDummyTea(id);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
