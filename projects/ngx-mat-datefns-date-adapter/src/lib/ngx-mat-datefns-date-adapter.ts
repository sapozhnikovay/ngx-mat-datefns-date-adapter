import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  Locale,
  parse,
  parseISO,
  setDay,
  setMonth,
  toDate,
  parseJSON,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz/esm';
import { enUS } from 'date-fns/esm/locale';
import { NGX_MAT_DATEFNS_LOCALES } from './ngx-mat-datefns-locales';

export interface NgxDateFnsDateAdapterOptions {
  useUtc?: boolean;
}

export const NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS =
  new InjectionToken<NgxDateFnsDateAdapterOptions>(
    'NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS',
    {
      providedIn: 'root',
      factory: NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS_FACTORY,
    }
  );

export function NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS_FACTORY(): NgxDateFnsDateAdapterOptions {
  return {
    useUtc: false,
  };
}

function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

const UTC_TIMEZONE = 'UTC';

@Injectable()
export class NgxDateFnsDateAdapter extends DateAdapter<Date> {
  private _dateFnsLocale: Locale;
  private getLocale = (localeCodeOrLocale: string | Locale): Locale => {
    if (localeCodeOrLocale && (localeCodeOrLocale as Locale).code) {
      return localeCodeOrLocale as Locale;
    }
    if (!this.locales || !this.locales.length) {
      throw new Error('locales array does not provided or is empty');
    }
    const locale = this.locales.find(
      (item) => item.code === localeCodeOrLocale
    );
    if (!locale) {
      throw new Error(`locale '${localeCodeOrLocale}' does not exist`);
    }
    return locale;
  };

  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string,
    @Inject(NGX_MAT_DATEFNS_LOCALES) private locales: Locale[],
    @Optional()
    @Inject(NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS)
    private options?: NgxDateFnsDateAdapterOptions
  ) {
    super();

    try {
      this.setLocale(dateLocale || enUS);
    } catch (err) {
      this.setLocale(enUS);
    }
  }

  setLocale(locale: string | Locale) {
    if (!locale) {
      throw new Error(
        'setLocale should be called with the string locale code or date-fns Locale object'
      );
    }
    this._dateFnsLocale = this.getLocale(locale);
    super.setLocale(locale);
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
        if (this.options.useUtc) {
          return parseJSON(value);
        }
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
        if (this.options.useUtc) {
          const d = parse(value.trim(), parseFormat, new Date(), {
            locale: this._dateFnsLocale,
          });
          return zonedTimeToUtc(d, UTC_TIMEZONE);
        }
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
    const d = new Date();
    return this._createDateWithOverflow(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    );
  }

  /** Creates a date but allows the month and date to overflow. */
  private _createDateWithOverflow(year: number, month: number, date: number) {
    const result = this._createDateInternal(year, month, date);

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }

  private _createDateInternal(year: number, month: number, date: number): Date {
    if (this.options.useUtc) {
      return zonedTimeToUtc(new Date(year, month, date), UTC_TIMEZONE);
    }
    return new Date(year, month, date);
  }
}
