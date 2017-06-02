import { TestBed, inject } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { HttpModule, JsonpModule } from '@angular/http';

import { OpenExchangeRatesService } from './../services/openexchangerates.service';
import { ConfigService } from './../services/config.service';

describe('Service: OpenExchangeRatesService', function () {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, JsonpModule],
      providers: [ OpenExchangeRatesService, {provide: 'configService', useFactory: () => ConfigService.getInstance()} ]
    });
  });

  beforeEach(inject([OpenExchangeRatesService], s => {
    service = s;
  }));

  it('should check if the open exchange service is define', () => {
    expect(service).toBeDefined();
  });
});
