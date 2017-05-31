import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  constructor (){

  }

  parseDate(date: any){
    date = date || null;
    let d = new Date(date);
    let curr_date = d.getDate(), curr_month = d.getMonth() + 1, curr_year = d.getFullYear();
    return curr_year + "-" + ("0" + (curr_month)).slice(-2) + "-" + ("0" + curr_date).slice(-2);
  }
}
