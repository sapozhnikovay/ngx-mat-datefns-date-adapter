# NgxMatDatefnsDateAdapter

This library provides a custom DateAdapter for the Angular Material Datepicker component using the `date-fns` library.

- Includes all locales provided by date-fns.
- Parses datetime using customizable formats.
- Built with Angular 9
- Includes 100% tests coverage

## Demo

An example can be found on [Stackblitz](https://stackblitz.com/edit/angular-ngx-mat-datefns-date-adapter)

## Installation

`npm i ngx-mat-datefns-date-adapter`

| Angular Version | Package Version |
| :-------------: | :-------------: |
|        9        |      9.X.X      |
|       10        |     10.X.X      |
|       11        |     11.X.X      |

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
import { da, ja } from 'date-fns/esm/locale'

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
In case of using `setLocale` with a string argument, target locale should be imported into NGX_MAT_DATEFNS_LOCALES array.

```typescript
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { fr } from 'date-fns/esm/locale';

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

Import date-fns locales from 'date-fns/esm/locale' entrypoint. This enables tree-shaking by the Angular builder.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Credits

I want to thanks entire [Angular](https://angular.io) team for creating this awesome framework.
