import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import * as _ from 'underscore';

@Component({
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class MainComponent  {
  currenciesCtrl: FormControl;
  filteredCurrencies: any;
  openexchangeratesService: any; helperService: any;

  currencies = [];

  selectedCurrency: string;
  selectedDate: string;
  selectedHistory: any;

  maxDate: any; 
  date: any;

  constructor(@Inject('openexchangeratesService') openexchangeratesService, @Inject('helperService') helperService) {
    this.currenciesCtrl = new FormControl();
    this.filteredCurrencies = this.currenciesCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterCurrencies(name));

    this.openexchangeratesService = openexchangeratesService;
    this.helperService = helperService;

    this.maxDate = new Date();
    this.date = new Date();
    this.selectedDate = this.helperService.parseDate(this.date);
  }

  ngOnInit() {
      this.openexchangeratesService.getCurrencies().subscribe(
      response => {
        let cur = [];
         _.each(response, function(row, i) {
            cur.push(i);
        });
        this.currencies = cur;
      }
    );
  }

  filterCurrencies(val: string) {
    return val ? this.currencies.filter(s => new RegExp(`^${val}`, 'gi').test(s)) : this.currencies;
  }

  onSelect(event: any, currency: string): void {
    this.selectedCurrency = currency;
    this.getHistory();
  }

  onChange(date: string): void {
    this.selectedDate = this.helperService.parseDate(date);
    this.getHistory();
  }

  getHistory(){
    this.openexchangeratesService.getHistory(this.selectedCurrency, this.selectedDate).subscribe(
      response => {
        let his = [];
         _.each(response.rates, function(row, i) {
            his.push({"name": i, "value": row});
        });
        this.selectedHistory = his;
      }
    );
  }

  showElementResult(){
    return (this.selectedCurrency && this.selectedDate);
  }
}
