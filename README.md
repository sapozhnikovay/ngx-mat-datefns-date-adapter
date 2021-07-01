# NgxMatDatefnsDateAdapter

[![NPM](https://img.shields.io/npm/l/ngx-mat-datefns-date-adapter)](https://github.com/sapozhnikovay/ngx-mat-datefns-date-adapter/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/ngx-mat-datefns-date-adapter)](https://www.npmjs.com/package/ngx-mat-datefns-date-adapter)
[![npm bundle size](https://img.shields.io/bundlephobia/min/ngx-mat-datefns-date-adapter)](https://bundlephobia.com/result?p=ngx-mat-datefns-date-adapter)
[![codecov](https://codecov.io/gh/sapozhnikovay/ngx-mat-datefns-date-adapter/branch/master/graph/badge.svg)](https://codecov.io/gh/sapozhnikovay/ngx-mat-datefns-date-adapter)

This library provides a custom DateAdapter for the Angular Material Datepicker component using the `date-fns` library.

- Includes all locales provided by date-fns.
- Parses datetime using customizable formats.
- Compatible with Angular 9/10/11/12
- Includes 100% tests coverage

## Demo

An example can be found on Stackblitz for:
- [Angular 9](https://stackblitz.com/edit/angular-ngx-mat-datefns-date-adapter)
- [Angular 10](https://stackblitz.com/edit/angular-ngx-mat-datefns-date-adapter-a10)
- [Angular 11](https://stackblitz.com/edit/angular-ngx-mat-datefns-date-adapter-a11)

## Installation

`npm i --save ngx-mat-datefns-date-adapter date-fns date-fns-tz`

Both `date-fns` and `date-fns-tz` libraries are peer dependencies, but required for the compilation.

| Angular Version | Package Version |
| :-------------: | :-------------: |
|        9        |      9.X.X      |
|       10        |     10.X.X      |
|       11        |     11.X.X      |
|       12        |     12.X.X      |

Version for the Angular 12 is compiled in IVY mode and currently is in beta only.
To install it, use `ivy` tag in npm:

`npm i --save ngx-mat-datefns-date-adapter@ivy date-fns date-fns-tz`

## Usage

1. Register the `NgxMatDateFnsDateModule` in your app module.
   > `import { NgxMatDateFnsDateModule } from 'ngx-mat-datefns-date-adapter'`

```typescript
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { NgxMatDateFnsDateModule } from "ngx-mat-datefns-date-adapter";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDateFnsDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Register custom locale token in providers if needed. Also register required locales in NGX_MAT_DATEFNS_LOCALES array.
   > `providers: [`
   > `{ provide: MAT_DATE_LOCALE, useValue: 'ja' },`
   > `{ provide: NGX_MAT_DATEFNS_LOCALES, useValue: [ja] }`
   > `],`

```typescript
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { NgxMatDateFnsDateModule } from "ngx-mat-datefns-date-adapter";
import { da, ja } from 'date-fns/locale'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDateFnsDateModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: "ja",
    },
    {
      provide: NGX_MAT_DATEFNS_LOCALES,
      useValue: [da, ja]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Default locale

When MAT_DATE_LOCALE and NGX_MAT_DATEFNS_LOCALES tokens are not provided, `en-US` locale is used by default. When empty or null value is provided to the MAT_DATE_LOCALE token, `en-US` locale is also used.

## Change locale dynamically

Use `setLocale()` method of the `DateAdapter`.
In case of using `setLocale` with a string argument, target locale must be imported into NGX_MAT_DATEFNS_LOCALES array.

```typescript
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { fr } from 'date-fns/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private readonly dateAdapter: DateAdapter<any>) {}

  setLocaleWithString(): void {
    this.dateAdapter.setLocale('fr');
  }

  setLocaleWithLocaleObject(): void {
    this.dateAdapter.setLocale(fr);
  }
}
```

## ES modules and Tree-shaking

Import date-fns locales from 'date-fns/locale' entrypoint. This enables tree-shaking by the Angular builder. Ensure that date-fns is version 2.20.3 or newer.

## UTC date creation

To get all selected dates in a `MatDatetimePicker` as a day start (00:00:00) in a UTC timezone, set useUtc flag in a NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS injection token.

```typescript
import { NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS } from 'ngx-mat-datefns-date-adapter';
...

@NgModule(
  ...
  providers: [
    ...
    {
      provide: NGX_MAT_DATEFNS_DATE_ADAPTER_OPTIONS,
      useValue: {
        useUtc: true
      }
    },
    ...
  ],
  ...
})
export class AppModule {}
...


```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Credits

I want to thanks entire [Angular](https://angular.io) team for creating this awesome framework.
