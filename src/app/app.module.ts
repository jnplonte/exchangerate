import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdAutocompleteModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MainComponent } from './components/main/main.component';

import { ConfigService } from './services/config.service';
import { OpenExchangeRatesService } from './services/openexchangerates.service';
import { HelperService } from './services/helper.service';

const appRoutes: Routes = [
  { path: '',
    component: MainComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ MaterialModule,
                  MdDatepickerModule, MdNativeDateModule,
                  BrowserAnimationsModule,
                  MdAutocompleteModule,
                  BrowserModule,
                  ReactiveFormsModule,
                  FormsModule,
                  HttpModule,
                  JsonpModule,
                  RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, MainComponent, PageNotFoundComponent ],
  providers:    [ {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'openexchangeratesService', useClass: OpenExchangeRatesService},
                  {provide: 'helperService', useClass: HelperService} ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
