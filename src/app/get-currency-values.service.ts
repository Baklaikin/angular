import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currencies } from './interface/currencies';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetCurrencyValuesService {
  baseURL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private http: HttpClient) { }

    search():Observable<Currencies[]>{
      return this.http.get<Currencies[]>(this.baseURL)
  }
}
