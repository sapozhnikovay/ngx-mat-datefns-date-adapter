import { LOCALE_ID } from '@angular/core';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { parseJSON } from 'date-fns';
import { da, ja } from 'date-fns/locale';
import {
  NgxDateFnsDateAdapter,
  NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS,
} from './ngx-mat-datefns-date-adapter';
import { NgxMatDateFnsDateModule } from './ngx-mat-datefns-date-adapter.module';
import { NGX_MAT_DATEFNS_LOCALES } from './ngx-mat-datefns-locales';

const [JAN, FEB, MAR, DEC] = [0, 1, 2, 11];

describe('NgxDateFnsDateAdapter', () => {
  let adapter: NgxDateFnsDateAdapter;
  let assertValidDate: (d: Date | null, valid: boolean) => void;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxMatDateFnsDateModule],
      }).compileComponents();
    })
  );

  beforeEach(inject([DateAdapter], (dateAdapter: NgxDateFnsDateAdapter) => {
    adapter = dateAdapter;

    assertValidDate = (d: Date | null, valid: boolean) => {
      expect(adapter.isDateInstance(d)).not.toBeNull(
        `Expected ${d} to be a date instance`
      );
      expect(adapter.isValid(d as Date)).toBe(
        valid,
        `Expected ${d} to be ${valid ? 'valid' : 'invalid'},` +
          ` but was ${valid ? 'invalid' : 'valid'}`
      );
    };
  }));

  it('should get year', () => {
    expect(adapter.getYear(new Date(2017, JAN, 1))).toBe(2017);
  });

  it('should get month', () => {
    expect(adapter.getMonth(new Date(2017, JAN, 1))).toBe(0);
  });

  it('should get number of days in a month', () => {
    expect(adapter.getNumDaysInMonth(new Date(2017, JAN, 1))).toBe(31);
    expect(adapter.getNumDaysInMonth(new Date(2016, FEB, 1))).toBe(29);
  });

  it('should get date', () => {
    expect(adapter.getDate(new Date(2017, JAN, 1))).toBe(1);
  });

  it('should get day of week', () => {
    expect(adapter.getDayOfWeek(new Date(2017, JAN, 1))).toBe(0);
  });

  it('should get long month names', () => {
    expect(adapter.getMonthNames('long')).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]);
  });

  it('should get short month names', () => {
    expect(adapter.getMonthNames('short')).toEqual([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]);
  });

  it('should get narrow month names', () => {
    expect(adapter.getMonthNames('narrow')).toEqual([
      'J',
      'F',
      'M',
      'A',
      'M',
      'J',
      'J',
      'A',
      'S',
      'O',
      'N',
      'D',
    ]);
  });

  it('should get month names in a different locale', () => {
    adapter.setLocale(ja);
    expect(adapter.getMonthNames('long')).toEqual([
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ]);
  });

  it('should get date names', () => {
    expect(adapter.getDateNames()).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ]);
  });

  it('should get long day of week names', () => {
    expect(adapter.getDayOfWeekNames('long')).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('should get short day of week names', () => {
    expect(adapter.getDayOfWeekNames('short')).toEqual([
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ]);
  });

  it('should get narrow day of week names', () => {
    expect(adapter.getDayOfWeekNames('narrow')).toEqual([
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S',
    ]);
  });

  it('should get day of week names in a different locale', () => {
    adapter.setLocale(ja);
    expect(adapter.getDayOfWeekNames('long')).toEqual([
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ]);
  });

  it('should get year name', () => {
    expect(adapter.getYearName(new Date(2017, JAN, 1))).toBe('2017');
  });

  it('should get first day of week', () => {
    expect(adapter.getFirstDayOfWeek()).toBe(0);
  });

  it('should create Date', () => {
    expect(adapter.createDate(2017, JAN, 1)).toEqual(new Date(2017, JAN, 1));
  });

  it('should not create Date with month over/under-flow', () => {
    expect(() => adapter.createDate(2017, DEC + 1, 1)).toThrow();
    expect(() => adapter.createDate(2017, JAN - 1, 1)).toThrow();
  });

  it('should not create Date with date over/under-flow', () => {
    expect(() => adapter.createDate(2017, JAN, 32)).toThrow();
    expect(() => adapter.createDate(2017, JAN, 0)).toThrow();
  });

  it('should create Date with low year number', () => {
    expect(adapter.createDate(-1, JAN, 1).getFullYear()).toBe(-1);
    expect(adapter.createDate(0, JAN, 1).getFullYear()).toBe(0);
    expect(adapter.createDate(50, JAN, 1).getFullYear()).toBe(50);
    expect(adapter.createDate(99, JAN, 1).getFullYear()).toBe(99);
    expect(adapter.createDate(100, JAN, 1).getFullYear()).toBe(100);
  });

  it("should get today's date", () => {
    expect(adapter.sameDate(adapter.today(), new Date())).toBe(
      true,
      "should be equal to today's date"
    );
  });

  it('should parse string', () => {
    expect(adapter.parse('1/1/2017', 'dd/MM/yyyy')).toEqual(
      new Date(2017, JAN, 1)
    );
  });

  it('should parse number', () => {
    const timestamp = new Date().getTime();
    expect(adapter.parse(timestamp, 'dd/MM/yyyy')).toEqual(new Date(timestamp));
  });

  it('should parse Date', () => {
    const date = new Date(2017, JAN, 1);
    expect(adapter.parse(date, 'dd/MM/yyyy')).toEqual(date);
    expect(adapter.parse(date, 'dd/MM/yyyy')).not.toBe(date);
  });

  it('should parse undefined as null', () => {
    expect(adapter.parse(undefined, 'dd/MM/yyyy')).toBeNull();
  });

  it('should parse [] as null', () => {
    expect(adapter.parse([], 'dd/MM/yyyy')).toBeNull();
  });

  it('should parse invalid value as invalid', () => {
    const d = adapter.parse('hello', 'dd/MM/yyyy');
    expect(d).not.toBeNull();
    expect(adapter.isDateInstance(d)).toBe(
      true,
      'Expected string to have been fed through Date.parse'
    );
    expect(adapter.isValid(d as Date)).toBe(
      false,
      'Expected to parse as "invalid date" object'
    );
  });

  it('should format', () => {
    expect(adapter.format(new Date(2017, JAN, 1), 'd/d/yyyy')).toEqual(
      '1/1/2017'
    );
  });

  it('should format with custom format', () => {
    expect(adapter.format(new Date(2017, JAN, 1), 'MMMM d, yyyy')).toEqual(
      'January 1, 2017'
    );
  });

  it('should format with a different locale', () => {
    adapter.setLocale(ja);
    expect(adapter.format(new Date(2017, JAN, 1), 'yyyy/d/d')).toEqual(
      '2017/1/1'
    );
  });

  it('should throw when attempting to format invalid date', () => {
    expect(() => adapter.format(new Date(NaN), 'd/d/yyyy')).toThrowError(
      /Invalid time value/
    );
  });

  it('should throw when attempting to set locale via string without providing NGX_MAT_DATEFNS_LOCALES token', () => {
    expect(() => adapter.setLocale('invalid')).toThrowError(
      /locale 'invalid' does not exist in locales array. Add it to the NGX_MAT_DATEFNS_LOCALES token./
    );
  });

  it('should throw when attempting to load null locale', () => {
    // @ts-expect-error - Argument of type 'null' is not assignable to parameter of type 'string | Locale'
    expect(() => adapter.setLocale(null)).toThrowError(
      /setLocale should be called with the string locale code or date-fns Locale object/
    );
  });

  it('should add years', () => {
    expect(adapter.addCalendarYears(new Date(2017, JAN, 1), 1)).toEqual(
      new Date(2018, JAN, 1)
    );
    expect(adapter.addCalendarYears(new Date(2017, JAN, 1), -1)).toEqual(
      new Date(2016, JAN, 1)
    );
  });

  it('should respect leap years when adding years', () => {
    expect(adapter.addCalendarYears(new Date(2016, FEB, 29), 1)).toEqual(
      new Date(2017, FEB, 28)
    );
    expect(adapter.addCalendarYears(new Date(2016, FEB, 29), -1)).toEqual(
      new Date(2015, FEB, 28)
    );
  });

  it('should add months', () => {
    expect(adapter.addCalendarMonths(new Date(2017, JAN, 1), 1)).toEqual(
      new Date(2017, FEB, 1)
    );
    expect(adapter.addCalendarMonths(new Date(2017, JAN, 1), -1)).toEqual(
      new Date(2016, DEC, 1)
    );
  });

  it('should respect month length differences when adding months', () => {
    expect(adapter.addCalendarMonths(new Date(2017, JAN, 31), 1)).toEqual(
      new Date(2017, FEB, 28)
    );
    expect(adapter.addCalendarMonths(new Date(2017, MAR, 31), -1)).toEqual(
      new Date(2017, FEB, 28)
    );
  });

  it('should add days', () => {
    expect(adapter.addCalendarDays(new Date(2017, JAN, 1), 1)).toEqual(
      new Date(2017, JAN, 2)
    );
    expect(adapter.addCalendarDays(new Date(2017, JAN, 1), -1)).toEqual(
      new Date(2016, DEC, 31)
    );
  });

  it('should clone', () => {
    const date = new Date(2017, JAN, 1);
    expect(adapter.clone(date)).toEqual(date);
    expect(adapter.clone(date)).not.toBe(date);
  });

  it('should preserve time when cloning', () => {
    const date = new Date(2017, JAN, 1, 4, 5, 6);
    expect(adapter.clone(date)).toEqual(date);
    expect(adapter.clone(date)).not.toBe(date);
  });

  it('should compare dates', () => {
    expect(
      adapter.compareDate(new Date(2017, JAN, 1), new Date(2017, JAN, 2))
    ).toBeLessThan(0);
    expect(
      adapter.compareDate(new Date(2017, JAN, 1), new Date(2017, FEB, 1))
    ).toBeLessThan(0);
    expect(
      adapter.compareDate(new Date(2017, JAN, 1), new Date(2018, JAN, 1))
    ).toBeLessThan(0);
    expect(
      adapter.compareDate(new Date(2017, JAN, 1), new Date(2017, JAN, 1))
    ).toBe(0);
    expect(
      adapter.compareDate(new Date(2018, JAN, 1), new Date(2017, JAN, 1))
    ).toBeGreaterThan(0);
    expect(
      adapter.compareDate(new Date(2017, FEB, 1), new Date(2017, JAN, 1))
    ).toBeGreaterThan(0);
    expect(
      adapter.compareDate(new Date(2017, JAN, 2), new Date(2017, JAN, 1))
    ).toBeGreaterThan(0);
  });

  it('should clamp date at lower bound', () => {
    expect(
      adapter.clampDate(
        new Date(2017, JAN, 1),
        new Date(2018, JAN, 1),
        new Date(2019, JAN, 1)
      )
    ).toEqual(new Date(2018, JAN, 1));
  });

  it('should clamp date at upper bound', () => {
    expect(
      adapter.clampDate(
        new Date(2020, JAN, 1),
        new Date(2018, JAN, 1),
        new Date(2019, JAN, 1)
      )
    ).toEqual(new Date(2019, JAN, 1));
  });

  it('should clamp date already within bounds', () => {
    expect(
      adapter.clampDate(
        new Date(2018, FEB, 1),
        new Date(2018, JAN, 1),
        new Date(2019, JAN, 1)
      )
    ).toEqual(new Date(2018, FEB, 1));
  });

  it('should use UTC for formatting by default', () => {
    expect(adapter.format(new Date(1800, 7, 14), 'E MMM dd yyyy')).toBe(
      'Thu Aug 14 1800'
    );
  });

  it('should count today as a valid date instance', () => {
    const d = new Date();
    expect(adapter.isValid(d)).toBe(true);
    expect(adapter.isDateInstance(d)).toBe(true);
  });

  it('should count an invalid date as an invalid date instance', () => {
    const d = new Date(NaN);
    expect(adapter.isValid(d)).toBe(false);
    expect(adapter.isDateInstance(d)).toBe(true);
  });

  it('should count a string as not a date instance', () => {
    const d = '1/1/2017';
    expect(adapter.isDateInstance(d)).toBe(false);
  });

  it('should create dates from valid ISO strings', () => {
    assertValidDate(adapter.deserialize('1985-04-12T23:20:50.52Z'), true);
    assertValidDate(adapter.deserialize('1996-12-19T16:39:57-08:00'), true);
    assertValidDate(adapter.deserialize('1937-01-01T12:00:27.87+00:20'), true);
    assertValidDate(adapter.deserialize('2017-01-01'), true);
    assertValidDate(adapter.deserialize('2017-01-01T00:00:00'), true);
    assertValidDate(adapter.deserialize('1990-13-31T23:59:00Z'), false);
    assertValidDate(adapter.deserialize('1/1/2017'), false);
    assertValidDate(adapter.deserialize('2017-01-01T'), true);
    assertValidDate(adapter.deserialize(1483228800), true);
    expect(adapter.deserialize('')).toBeNull();
    expect(adapter.deserialize(null)).toBeNull();
    expect(adapter.deserialize([])).toBeNull();
    assertValidDate(adapter.deserialize(new Date()), true);
    assertValidDate(adapter.deserialize(new Date(NaN)), false);
    assertValidDate(adapter.deserialize(1483228800), true);
  });

  it('should format Date to ISO8601 string', () => {
    expect(adapter.toIso8601(new Date(2017, JAN, 1))).toEqual(
      new Date(2017, JAN, 1).toISOString()
    );
  });

  it('should create an invalid date', () => {
    assertValidDate(adapter.invalid(), false);
  });

  it('should not throw when attempting to format a date with a year less than 1', () => {
    expect(() => adapter.format(new Date(-1, 1, 1), 'd/d/yyyy')).not.toThrow();
  });

  it('should not throw when attempting to format a date with a year greater than 9999', () => {
    expect(() =>
      adapter.format(new Date(10000, 1, 1), 'd/d/yyyy')
    ).not.toThrow();
  });
});

describe('NgxDateFnsDateAdapter with MAT_DATE_LOCALE override', () => {
  let adapter: NgxDateFnsDateAdapter;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxMatDateFnsDateModule],
        providers: [
          { provide: MAT_DATE_LOCALE, useValue: 'da' },
          { provide: NGX_MAT_DATEFNS_LOCALES, useValue: [da] },
        ],
      }).compileComponents();
    })
  );

  beforeEach(inject([DateAdapter], (d: NgxDateFnsDateAdapter) => {
    adapter = d;
  }));

  it('should take the default locale id from the MAT_DATE_LOCALE injection token', () => {
    const expectedValue = [
      'søndag',
      'mandag',
      'tirsdag',
      'onsdag',
      'torsdag',
      'fredag',
      'lørdag',
    ];

    expect(adapter.getDayOfWeekNames('long')).toEqual(expectedValue);
  });
});

describe('NgxDateFnsDateAdapter with MAT_DATE_LOCALE override', () => {
  let adapter: NgxDateFnsDateAdapter;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxMatDateFnsDateModule],
        providers: [{ provide: MAT_DATE_LOCALE, useValue: 'invalid' }],
      }).compileComponents();
    })
  );

  beforeEach(inject([DateAdapter], (d: NgxDateFnsDateAdapter) => {
    adapter = d;
  }));

  it('should set en-US locale when overriding the MAT_DATE_LOCALE injection token with invalid locale value', () => {
    expect(adapter.format(new Date(2017, JAN, 1), 'MMMM d, yyyy')).toEqual(
      'January 1, 2017'
    );
  });
});

describe('NgxDateFnsDateAdapter with LOCALE_ID override', () => {
  let adapter: NgxDateFnsDateAdapter;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxMatDateFnsDateModule],
        providers: [
          { provide: LOCALE_ID, useValue: 'da' },
          { provide: NGX_MAT_DATEFNS_LOCALES, useValue: [da] },
        ],
      }).compileComponents();
    })
  );

  beforeEach(inject([DateAdapter], (d: NgxDateFnsDateAdapter) => {
    adapter = d;
  }));

  it('should cascade locale id from the LOCALE_ID injection token to MAT_DATE_LOCALE', () => {
    const expectedValue = [
      'søndag',
      'mandag',
      'tirsdag',
      'onsdag',
      'torsdag',
      'fredag',
      'lørdag',
    ];

    expect(adapter.getDayOfWeekNames('long')).toEqual(expectedValue);
  });
});

describe('NgxDateFnsDateAdapter with MAT_DATE_LOCALE override', () => {
  let adapter: NgxDateFnsDateAdapter;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxMatDateFnsDateModule],
        providers: [{ provide: MAT_DATE_LOCALE, useValue: '' }],
      }).compileComponents();
    })
  );

  beforeEach(inject([DateAdapter], (d: NgxDateFnsDateAdapter) => {
    adapter = d;
  }));

  it('should load en-US locale when MAT_DATE_LOCALE is null|empty string|undefined etc ', () => {
    expect(adapter.getMonthNames('long')).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]);
  });
});

describe('NgxDateFnsDateAdapter with NGX_MAT_DATEFNS_LOCALES set', () => {
  let adapter: NgxDateFnsDateAdapter;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxMatDateFnsDateModule],
        providers: [{ provide: NGX_MAT_DATEFNS_LOCALES, useValue: [da] }],
      }).compileComponents();
    })
  );

  beforeEach(inject([DateAdapter], (d: NgxDateFnsDateAdapter) => {
    adapter = d;
  }));

  it('should throw when attempting to set locale without providing it in the NGX_MAT_DATEFNS_LOCALES token', () => {
    expect(() => adapter.setLocale('ru')).toThrowError(
      /locale \'ru\' does not exist in locales array. Add it to the NGX_MAT_DATEFNS_LOCALES token./
    );
  });
});

describe('NgxDateFnsDateAdapter with NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS override', () => {
  describe('use UTC', () => {
    let adapter: NgxDateFnsDateAdapter;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [NgxMatDateFnsDateModule],
          providers: [
            {
              provide: NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS,
              useValue: { useUtc: true },
            },
          ],
        }).compileComponents();
      })
    );

    beforeEach(inject([DateAdapter], (d: NgxDateFnsDateAdapter) => {
      adapter = d;
    }));

    it('should create date in UTC', () => {
      const expectedDate = parseJSON('2017-01-02T00:00:00Z');
      expect(adapter.createDate(2017, JAN, 2)).toEqual(expectedDate);
    });

    it('should create today in UTC', () => {
      const today = new Date();
      const todayUTCString = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today
        .getDate()
        .toString()
        .padStart(2, '0')}T00:00:00Z`;
      const expectedDate = parseJSON(todayUTCString);
      expect(adapter.today()).toEqual(expectedDate);
    });

    it('should parse dates to UTC', () => {
      const expectedDate = parseJSON('2017-01-02T00:00:00Z');
      expect(adapter.parse('1/2/2017', 'MM/dd/yyyy')).toEqual(expectedDate);
    });

    it('should return UTC date when deserializing', () => {
      const expectedDate = parseJSON('2020-04-12T23:20:50.52Z');
      expect(adapter.deserialize('2020-04-12T23:20:50.52Z')).toEqual(
        expectedDate
      );
    });
  });
});
