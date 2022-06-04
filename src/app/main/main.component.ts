import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../share/data-share.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  firstCurrency = document.getElementById('#firstCurrency');
  secondCurrency = document.getElementById('#secondCurrency');
  amount = document.querySelector('.amount');

  firstCurrencyValue: number = 0;
  secondCurrencyValue: number = 0;
  quantity: number = 0;
  result: number = 0;
  output: string = "";
  reverse: boolean = false;

  message: any;
  
  items: any[] = [
    { id: 0, name: 'Валюта' },
    { id: 1, name: 'uah' },
    { id: 2, name: 'usd' },
    { id: 3, name: 'eur' },
    { id: 4, name: 'btc' }
  ];
  
  constructor(private data: DataShareService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  calculateRate() {
    const btc = this.items[4].name.toUpperCase();
    const usd = this.message.find((item: any) => {
      if (item.ccy === "USD") {
        return item.sale
      }
    })

    if (this.firstCurrency === btc || this.secondCurrency === btc) {
      this.calcToBtc(this.reverse);
      return;
    }

    if (this.firstCurrency === this.items[4].name.toUpperCase() && this.secondCurrency === this.items[1].name.toUpperCase()) {
      if (this.reverse) {
        this.result = ((this.secondCurrencyValue / this.firstCurrencyValue) * Number(usd.sale)) * this.quantity;
      } else {
        this.result = ((this.firstCurrencyValue / this.secondCurrencyValue) * Number(usd.sale)) * this.quantity;
      }
      this.result = Number(this.result.toFixed(2));
      this.output = this.result.toString();
      return;
    }

    if (this.firstCurrencyValue && this.secondCurrencyValue && this.quantity) {
      if (this.reverse) {
        this.result = (this.secondCurrencyValue / this.firstCurrencyValue) * this.quantity;
      } else {
        this.result = (this.firstCurrencyValue / this.secondCurrencyValue) * this.quantity;
      }
    }
  
    this.result = Number(this.result.toFixed(2));
    this.output = this.result.toString();
    return this.output;
  }

  calcToBtc(reverse: boolean) {
    const usd = this.items[2].name.toUpperCase();
    const eur = this.items[3].name.toUpperCase();    
    
    if (this.firstCurrency === usd || this.secondCurrency === usd) {
      if (this.reverse) {
        this.result = (this.secondCurrencyValue / 1) * this.quantity;
      } else {
        this.result = (1 / this.secondCurrencyValue) * this.quantity;
      }
    } else if (this.firstCurrency === eur || this.secondCurrency === eur) {
      const euroSale = this.message.find((item:any) => item.ccy.toUpperCase() === eur);
      const usdSale = this.message.find((item:any) => item.ccy.toUpperCase() === usd);
      const priceInEuro = euroSale.sale / usdSale.sale;

      if (this.reverse) {
        this.result = (this.secondCurrencyValue / priceInEuro) * this.quantity;
      } else {
        this.result = (priceInEuro / this.secondCurrencyValue) * this.quantity;
      }
    }

    this.result = Number(this.result.toFixed(6));
    this.output = this.result.toString();
    return;
  }
  
 
  getSelectedValue(event: any) {
  
    if (event.target.id === "firstCurrency") {
      this.firstCurrency = this.items[event.target.value].name.toUpperCase();

       if (this.firstCurrency === this.items[1].name.toUpperCase()) {
          this.firstCurrencyValue = 1;
          return;
        }
      this.message.filter((item: any) => {   
        if (item.ccy === this.firstCurrency) {
          this.firstCurrencyValue = item.sale;
          return
        }
      })
      return;
    }
     if (event.target.id === "secondCurrency") {
       this.secondCurrency = this.items[event.target.value].name.toUpperCase();
        if (this.secondCurrency === this.items[1].name.toUpperCase()) {
          this.secondCurrencyValue = 1;
          return;
        }
       this.message.filter((item:any) => {
         if (item.ccy === this.secondCurrency) {
           this.secondCurrencyValue = item.sale;
         }
       })
      return;
    } 
    if (event.target.name === "amount") {
      this.quantity = Number(event.target.value);
      // this.calculateRate(this.firstCurrencyValue,this.secondCurrencyValue,this.quantity);
      return;
    }
  }

  changeDirection() {
    this.reverse = !this.reverse;
    this.calculateRate();
  }
}
