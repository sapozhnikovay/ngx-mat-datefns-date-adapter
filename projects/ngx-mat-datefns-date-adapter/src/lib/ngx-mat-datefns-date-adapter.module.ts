import { NgModule } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { NgxDateFnsDateAdapter } from './ngx-mat-datefns-date-adapter';
import { NGX_MAT_DATEFNS_DATE_FORMATS } from './mgx-mat-datefns-date-formats';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: NgxDateFnsDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class NgxDateFnsDateModule {}

@NgModule({
  imports: [NgxDateFnsDateModule],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: NGX_MAT_DATEFNS_DATE_FORMATS },
  ],
})
export class NgxMatDateFnsDateModule {}
