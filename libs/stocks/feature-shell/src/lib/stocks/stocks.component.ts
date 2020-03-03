import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  maxDate: Date;
  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
    this.maxDate = new Date();
  }

  ngOnInit() {
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol} = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, 'max');
    }
  }
}
