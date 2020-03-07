import { CHART_DATE_RANGE } from './stock-chart-constants';


export const dateRangeDifference = (toDate: Date, fromDate: Date) => {
  const toDateValue = toDate.valueOf();
  const fromDateValue = fromDate.valueOf();
  const days = (toDateValue !== fromDateValue) ? Math.round(Math.abs((toDateValue - fromDateValue) / 86400000)) : 0;
  let period;
  switch (true) {
    case (days === 0 ):
      return null;
    case (days <= 1):
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
