import { Inject, Optional, Injectable } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  parse,
  setDay,
  setMonth,
  toDate,
  Locale,
  parseISO,
  getDay,
} from 'date-fns';
import * as locales from 'date-fns/locale';

function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

@Injectable()
export class NgxDateFnsDateAdapter extends DateAdapter<Date> {
  private _dateFnsLocale: Locale;
  private getLocale = (localeCode) => {
    if (!localeCode) {
      throw new Error('localeCode should have a value');
    }
    const localeKey = Object.keys(locales).find(
      (key) => locales[key].code === localeCode
    );
    if (!localeKey) {
      throw new Error(`locale '${localeCode}' does not exist`);
    }
    return locales[localeKey];
  };

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super();

    try {
      this.setLocale(dateLocale);
    } catch (err) {
      this.setLocale('en-US');
    }
  }

  setLocale(locale: string) {
    try {
      this._dateFnsLocale = this.getLocale(locale);
      super.setLocale(locale);
    } catch (err) {
      throw new Error('Cannot load locale: ' + locale);
    }
  }

  addCalendarDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  addCalendarMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }

  addCalendarYears(date: Date, years: number): Date {
    return addYears(date, years);
  }

  clone(date: Date): Date {
    return toDate(date);
  }

  createDate(year: number, month: number, date: number): Date {
    // Check for invalid month and date (except upper bound on date which we have to check after
    // creating the Date).
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createDateWithOverflow(year, month, date);
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() !== month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  deserialize(value: any): Date | null {
    if (value) {
      if (typeof value === 'string') {
        return parseISO(value);
      }
      if (typeof value === 'number') {
        return toDate(value);
      }
      if (value instanceof Date) {
        return this.clone(value as Date);
      }
      return null;
    }
    return null;
  }

  format(date: Date, displayFormat: string): string {
    return format(date, displayFormat, { locale: this._dateFnsLocale });
  }

  getDate(date: Date): number {
    return getDate(date);
  }

  getDateNames(): string[] {
    return range(1, 31).map((day) => String(day));
  }

  getDayOfWeek(date: Date): number {
    return getDay(date);
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const map = {
      long: 'EEEE',
      short: 'EEE',
      narrow: 'EEEEE',
    };

    const formatStr = map[style];
    const date = new Date();

    return range(0, 6).map((month) =>
      format(setDay(date, month), formatStr, {
        locale: this._dateFnsLocale,
      })
    );
  }

  getFirstDayOfWeek(): number {
    return this._dateFnsLocale.options.weekStartsOn;
  }

  getMonth(date: Date): number {
    return getMonth(date);
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const map = {
      long: 'LLLL',
      short: 'LLL',
      narrow: 'LLLLL',
    };

    const formatStr = map[style];
    const date = new Date();

    return range(0, 11).map((month) =>
      format(setMonth(date, month), formatStr, {
        locale: this._dateFnsLocale,
      })
    );
  }

  getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  getYear(date: Date): number {
    return getYear(date);
  }

  getYearName(date: Date): string {
    return format(date, 'yyyy', {
      locale: this._dateFnsLocale,
    });
  }

  invalid(): Date {
    return new Date(NaN);
  }

  isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  parse(value: any, parseFormat: any): Date | null {
    if (value) {
      if (typeof value === 'string') {
        return parse(value.trim(), parseFormat, new Date(), {
          locale: this._dateFnsLocale,
        });
      }
      if (typeof value === 'number') {
        return toDate(value);
      }
      if (value instanceof Date) {
        return this.clone(value as Date);
      }
      return null;
    }
    return null;
  }

  toIso8601(date: Date): string {
    return date.toISOString();
  }

  today(): Date {
    return new Date();
  }

  /** Creates a date but allows the month and date to overflow. */
  private _createDateWithOverflow(year: number, month: number, date: number) {
    const result = new Date(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }
}
