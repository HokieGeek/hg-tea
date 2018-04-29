// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';

import { NaturalLanguageDatePipe } from './natural-language-date-pipe';

describe('Pipe: naturalDate', () => {
    let pipe: NaturalLanguageDatePipe;

    beforeEach(() => {
        pipe = new NaturalLanguageDatePipe();
    });

    it('Check just now', () => {
        expect(pipe.transform(new Date())).toBe('Just now');
    });
});
