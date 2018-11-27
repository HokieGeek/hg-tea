import { Injectable } from '@angular/core';
import { UrlSegment, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class MockActivatedRoute {
    url = of([new UrlSegment('foo', {})]);
    queryParamMap = of(convertToParamMap({}));
    paramMap = of(convertToParamMap({}));
}
