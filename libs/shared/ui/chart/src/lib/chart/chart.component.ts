import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  chartData: any;
  @Input() startDate$;
  @Input() endDate$;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor() {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };
    this.data$.subscribe(newData => {
      newData = newData.filter((d)=> new Date(d[0]) > new Date(this.startDate$) && new Date(d[0]) < new Date(this.endDate$))
      return this.chartData = newData
    });
  }
}
