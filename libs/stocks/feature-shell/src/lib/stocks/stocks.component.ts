import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime, skipWhile, map } from 'rxjs/operators';


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

  quotes$ = this.priceQuery.priceQueries$.pipe(map(data => {
    const { fromDate, toDate } = this.stockPickerForm.value;
    if(fromDate || toDate) {
      return this.filterByDateSelection(data);
    }
    return data;
  }));

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      fromDate: [null],
      toDate: [null]
    });
  }

  ngOnInit() {
    this.stockPickerForm.controls.symbol.valueChanges.pipe(debounceTime(500)).subscribe(() => this.fetchQuote());
    const { symbol, fromDate, toDate } = this.stockPickerForm.controls;
    symbol.valueChanges.pipe(debounceTime(400)).subscribe(() => this.fetchQuote());
    fromDate.valueChanges.subscribe(() => this.validateDate('fromDate'));
    toDate.valueChanges.subscribe(() => this.validateDate('toDate'));
    this.stockPickerForm.valueChanges.pipe(skipWhile(() => !fromDate.value || !toDate.value)).subscribe(() => this.compareDates());
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate} = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, '1D');
    }
  }

  private validateDate(control: string) {
    const date = this.stockPickerForm.controls[control];
    const presentDay = new Date();
    if(date.value > presentDay) {
      date.setValue(presentDay);
    }
    this.fetchQuote();
  }

  private compareDates() {
    const { fromDate, toDate } = this.stockPickerForm.controls;
    if (fromDate.value && toDate.value) {
      if (fromDate.value > toDate.value) {
        toDate.setValue(fromDate.value);
      }
    }
  }

  private filterByDateSelection(items: any[]) {
    const { fromDate, toDate } = this.stockPickerForm.value;
    const filtered = items.filter(item => {
      const date = new Date(item[0]);
      if(fromDate && toDate) {
        return date >= fromDate && date <= toDate;
      } else if(fromDate) {
        return date >= fromDate;
      } else if(toDate) {
        return date <= toDate;
      }
    });
    return filtered;
  }
}


