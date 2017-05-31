import { inject, TestBed } from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import { HttpModule, JsonpModule } from '@angular/http';

import { OpenExchangeRatesService } from './../services/openexchangerates.service';

describe('Service: OpenExchangeRatesService', function () {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, JsonpModule],
      providers: [ OpenExchangeRatesService ]
    });
  });

  beforeEach(inject([OpenExchangeRatesService], s => {
    service = s;
  }));

  it('should check if the api service is define', () => {
    expect(service.getCurrencies()).toBeDefined();
    expect(service.extractData()).toBeDefined();
    expect(service.handleError()).toBeDefined();
  });
});
