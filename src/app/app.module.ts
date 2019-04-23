import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';


import { Ng2FlatpickrModule, Ng2FlatpickrComponent } from 'ng2-flatpickr';


import { AppComponent } from './app.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { TimeZoneSelectorComponent } from './time-zone-selector/time-zone-selector.component';
import { FlatpickerComponent } from './flatpicker/flatpicker.component';


@NgModule({
  declarations: [
    AppComponent,
    DateTimePickerComponent,
    TimeZoneSelectorComponent,
    FlatpickerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
