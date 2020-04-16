import { Injectable } from '@angular/core';
import  moment from 'moment';

@Injectable()
export class TimeService {
  getStartDate() {
    const now = moment(new Date().toISOString());
    return now.startOf('day').format();
  }
  getEndDate() {
    const now = moment(new Date().toISOString());
    return now.endOf('day').format();
  }
  getUTCFormat(datetime: string) {
    const now = moment(datetime);
    return now.utc().format();
  }

  dateTimeToOdooFormat(datetime: string) {
    const now = moment(datetime);
    return now.utc().format('MM/DD/YY HH:mm:ss');
  }
}
