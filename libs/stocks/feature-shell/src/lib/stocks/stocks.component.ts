import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime } from 'rxjs/operators';


interface TimePeriod {
  value: string;
  display: string;
}
@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  value: string;
  period: string;
  symbol: string;
  display: string;

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods: TimePeriod[]  = [
    { value: 'max', display: 'All available data'},
    { value: '5y', display: 'Five years'},
    { value: '2y', display: 'Two years'},
    { value: '1y', display: 'One year'},
    { value: 'ytd', display: 'Year-to-date'},
    { value: '6m', display: 'Six months'},
    { value: '3m', display: 'Three months'},
    { value: '1m', display: 'One month'}
  ];



  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.stockPickerForm.controls.symbol.valueChanges.pipe(debounceTime(500)).subscribe(() => this.fetchQuote());
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  selectedDatePeriod() {
    this.fetchQuote();
  }
}
