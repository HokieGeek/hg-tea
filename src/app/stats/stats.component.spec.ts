import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { StatsComponent } from './stats.component';

describe('StatsComponent', () => {
    let component: StatsComponent;
    let fixture: ComponentFixture<StatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                ChartsModule,
            ],
            declarations: [ StatsComponent ],
            providers: [ HttpClient ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
