import {
  Component,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() data$: Observable<any>;
  @Input() title: string;
  @Input() type: string;
  @Input() columnNames: string[];
  @Input() options: any;

  constructor() {

  }
}
