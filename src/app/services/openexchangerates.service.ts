import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OpenExchangeRatesService {
  config: any;
  constructor (private http: Http, @Inject('configService') configService){
    this.config = configService.data;
  }

  getCurrencies(){
      let currenciesUrl = this.config.openExchangeRates.currenciesEndPoint + "?app_id=" + this.config.openExchangeRates.apiKey
      return this.http.get(currenciesUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getHistory(selectedCurrency, selectedDate){
      // hardcoded baseCurrency to USD because free api only support this.
      // let historysUrl = this.config.openExchangeRates.historyEndPoint + "/"+ selectedDate + ".json?app_id=" + this.config.openExchangeRates.apiKey + "&base=" + selectedCurrency;
      let historysUrl = this.config.openExchangeRates.historyEndPoint + "/"+ selectedDate + ".json?app_id=" + this.config.openExchangeRates.apiKey + "&base=USD";
      return this.http.get(historysUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    res = res || null;

    if(res){
      let body = res.json();
      return body || {};
    }else{
      return {};
    }
  }

  private handleError(error: Response | any) {
    error = error || null;
    if(error){
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }else{
      console.error('Fatal Error');
      return Observable.throw('Fatal Error');
    }
  }
}
