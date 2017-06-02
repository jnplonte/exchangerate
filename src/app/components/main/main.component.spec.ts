import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule, MdAutocompleteModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';
import { ConfigService } from './../../services/config.service';
import { OpenExchangeRatesService } from './../../services/openexchangerates.service';
import { HelperService } from './../../services/helper.service';

describe('Component: MainComponent', function () {
  let el: HTMLElement;
  let de: DebugElement;
  let comp: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    ConfigService.loadInstance('./base/site/test-config.json').then(() => {
      TestBed.configureTestingModule({
        imports:      [ HttpModule, JsonpModule, FormsModule, 
                        ReactiveFormsModule, RouterTestingModule, MaterialModule, MdDatepickerModule, MdNativeDateModule, MdAutocompleteModule,
                        BrowserAnimationsModule ],
        declarations: [
            MainComponent
        ],
        providers:    [ {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                        {provide: 'openexchangeratesService', useClass: OpenExchangeRatesService},
                        {provide: 'helperService', useClass: HelperService} ],
      })
      .compileComponents();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(true).toBeTruthy();
  });

  it('should have expected the added components', () => {
    fixture.detectChanges();
    const componentInput = fixture.debugElement.query(By.css('md-input-container'));
    expect(componentInput).toBeDefined();

    const componentAutoComplete = fixture.debugElement.query(By.css('md-autocomplete'));
    expect(componentAutoComplete).toBeDefined();

    const componentDatePicker = fixture.debugElement.query(By.css('md-datepicker'));
    expect(componentDatePicker).toBeDefined();
  });
});
