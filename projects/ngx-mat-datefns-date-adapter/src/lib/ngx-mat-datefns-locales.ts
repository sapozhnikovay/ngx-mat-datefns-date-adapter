import { InjectionToken } from '@angular/core';
import { Locale } from 'date-fns';

export const NGX_MAT_DATEFNS_LOCALES = new InjectionToken<Locale[]>(
  'NGX_MAT_DATEFNS_LOCALES'
);
