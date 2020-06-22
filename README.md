# NgxMatDatefnsDateAdapter

![NPM](https://img.shields.io/npm/l/ngx-mat-datefns-date-adapter)
![npm](https://img.shields.io/npm/v/ngx-mat-datefns-date-adapter)
![npm bundle size](https://img.shields.io/bundlephobia/min/ngx-mat-datefns-date-adapter)

This library provides a custom DateAdapter for the Angular Material Datepicker component using the `date-fns` library.

- Includes all locales provided by date-fns.
- Parses datetime using customizable formats.
- Built with Angular 9
- Includes 100% tests coverage

## Demo

An example can be found on [Stackblitz](https://stackblitz.com/edit/angular-ngx-mat-datefns-date-adapter)

## Installation

`npm i ngx-mat-datefns-date-adapter`

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

2. Register custom locale token in providers if needed.
   > `providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ja' }],`

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Credits

I want to thanks entire [Angular](https://angular.io) team for creating this awesome framework.
