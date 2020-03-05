import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import {CHART_DATE_RANGE} from '../../utils/stock-chart-constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  fromDate: string;
  toDate: string;
  toDatedisabled = true;
  quotes$ = this.priceQuery.priceQueries$;
  fromDateSub:Subscription;
  max = new Date();


  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    }, {
      validator: this.toDateSelectionValidator('fromDate', 'toDate')
    });
  }

  ngOnInit() {
    this.stockPickerForm.controls['toDate'].disable()
    this.fromDateSub = this.stockPickerForm.controls.fromDate.valueChanges.subscribe(() => this.stockPickerForm.controls['toDate'].enable());
  }


  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      const period = this.dateRangeDifference(toDate, fromDate);
      if(!period) {
        this.stockPickerForm.controls['fromDate'].setErrors({ 'incorrect': true });
        this.stockPickerForm.controls['toDate'].setErrors({ 'incorrect': true });
      } else {
        this.priceQuery.fetchQuote(symbol, period);
    }
  }
  }

  dateRangeDifference (toDate: Date, fromDate: Date) {
    const toDateValue = toDate.valueOf();
    const fromDateValue = fromDate.valueOf();
    const days = (toDateValue !== fromDateValue) ? Math.round(Math.abs((toDateValue - fromDateValue) / 86400000)) : 0;
    let period;
    switch (true) {
      case (days === 0 ):
        return null;
      case (days <= 2):
        period = CHART_DATE_RANGE.PERIOD['1D'];
        break;
      case (days <= 5):
        period = CHART_DATE_RANGE.PERIOD['5D'];
        break;
      case (days <= 15):
        period = CHART_DATE_RANGE.PERIOD['15D'];
        break;
      case (days <= 30):
        period = CHART_DATE_RANGE.PERIOD['1M'];
        break;
      case (days <= 180):
        period = CHART_DATE_RANGE.PERIOD['6M'];
        break;
      case (days <= 365):
        period = CHART_DATE_RANGE.PERIOD['1Y'];
        break;
      case (days > 730):
        period = CHART_DATE_RANGE.PERIOD['MAX'];
        break;
    }
    return period;
  }


  toDateSelectionValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const fromDate = formGroup.controls[controlName];
      const toDate = formGroup.controls[matchingControlName];
      if (toDate.errors && toDate.errors.matDatepickerMin) {
        toDate.setValue(fromDate.value);
      }
    }
  }

  dateSelection() {
    console.log('change event');
    this.toDatedisabled = false
  }

  ngOnDestroy() {
    this.fromDateSub.unsubscribe();
  }

}
