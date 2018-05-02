import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { TeaDbService } from './teadb.service';

describe('TeaDbService', () => {
    let injector: TestBed;
    let service: TeaDbService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TeaDbService]
        });
        injector = getTestBed();
        service = injector.get(TeaDbService);
        httpMock = injector.get(HttpTestingController);
    });

    it('handleError', () => {
        // Q&D testing
        expect(service.handleError('foo')).not.toBeNull();
        expect(service.handleError({ message: 'bar' })).not.toBeNull();
        expect(service.handleError({ status: 400, statusText: 'raboof' })).not.toBeNull();
    });

    /*
     * getJournalEntries
     * getTeaData
     * extractSpreadsheetEntries
     * convertJsonToTea
     * convertJsonToEntry
     * handleError
     */
});
