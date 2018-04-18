import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JournalEntryComponent } from './journal-entry.component';
import { TeacupimgComponent } from './teacupimg/teacupimg.component';
import { NaturalLanguageDatePipe } from '../natural-language-date-pipe'

import { Tea } from '../tea'
import { Entry } from '../entry'

describe('JournalEntryComponent', () => {
  let component: JournalEntryComponent;
  let fixture: ComponentFixture<JournalEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [
            NaturalLanguageDatePipe,
            TeacupimgComponent,
            JournalEntryComponent
        ],
        providers: [ NaturalLanguageDatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(JournalEntryComponent);
      component = fixture.componentInstance;

      component.entry = new Entry(
          1, //teaId
          'COMMENT', // comments
          '12/30/2011 7:49:05', // timestamp
          '9999/99/99', // date
          900, // time
          3, // rating
          '', // pictures
          '1m 2s', // steeptime
          0, // steepingvessel_idx
          212, // steeptemperature
          '', // sessioninstance
          '' // fixins_list
      )

      component.tea = new Tea(
          1, // id
          'Foobar', // name
          '12/30/2011 7:49:05', // timestamp
          '9999/99/99', // date
          'Sheng', // type
          'Yunnan', // region
          2999, // year
          0, // flush
          'tea.awesome.site', // purchaselocation
          '9999/99/99', // purchasedate
          '99.99', // purchaseprice
          '', // ratings
          'COMMENT', // comments
          [], // pictures
          'China', // country
          '', // leafgrade
          '', // blendedteas
          '', // blendratio
          'Full Beeng', // size
          true , // stocked
          true , // aging
          'loose' // packaging
      )

      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
