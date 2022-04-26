import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

const NUMERO_ANIOS = 2;
const NUMERO_MESES = 1;
const NUMERO_DATE = 0;

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  parse(value: string): Date | null {
    if (typeof value === 'string' && value.indexOf('/') > -1) {
      const str = value.split('/');

      const year = Number(str[NUMERO_ANIOS]);
      const month = Number(str[NUMERO_MESES]) - 1;
      const date = Number(str[NUMERO_DATE]);

      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: object): string {
    date = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
    displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });

    const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
    return dtf.format(date).replace(/[\u200e\u200f]/g, '');
  }
}
