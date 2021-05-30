import { NgModule } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { NGX_MAT_DATEFNS_DATE_FORMATS } from './ngx-mat-datefns-date-formats';
import { NgxDateFnsDateAdapter, NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS } from './ngx-mat-datefns-date-adapter';
import { NGX_MAT_DATEFNS_LOCALES } from './ngx-mat-datefns-locales';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: NgxDateFnsDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_DATEFNS_LOCALES, NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class NgxDateFnsDateModule {}

@NgModule({
  imports: [NgxDateFnsDateModule],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: NGX_MAT_DATEFNS_DATE_FORMATS },
    { provide: NGX_MAT_DATEFNS_LOCALES, useValue: [] },
  ],
})
export class NgxMatDateFnsDateModule {}
