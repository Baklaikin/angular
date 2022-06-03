import { Component, OnInit } from '@angular/core';
import { GetCurrencyValuesService } from '../get-currency-values.service';
// import { HttpClient } from '@angular/common/http';
// import { __values } from 'tslib';
import { Currencies } from '../interface/currencies';
import { BehaviorSubject } from 'rxjs';
import { DataShareService } from '../share/data-share.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
  
export class HeaderComponent implements OnInit {
  currency: Array<Currencies> = [];
  message: Array<Currencies> = this.currency;
  
  constructor(private getValue: GetCurrencyValuesService,
    private data: DataShareService
  ) {
  }

  ngOnInit(): void {
    this.getCurenciesValue();
    this.data.currentMessage.subscribe(message=>this.message = message)
    
  
  }
  getCurenciesValue() {
    this.getValue.search().subscribe(
      (response) => {
        this.currency = response;
        this.newMessage();
      })
  };
  newMessage() {
    this.data.changeMessage(this.currency);
 }

  }
