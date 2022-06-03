import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { HttpClient } from '@angular/common/http';
import { GetCurrencyValuesService } from './get-currency-values.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [GetCurrencyValuesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
