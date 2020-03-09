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
  @Input() type: string;
  @Input() title: string;
  @Input() columnNames: string;
  @Input() options: string;
  constructor() {

  }
}
