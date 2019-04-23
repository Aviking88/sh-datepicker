import { Component, ViewEncapsulation, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FlatpickerComponent } from '../flatpicker/flatpicker.component';

const dateFormat = 'DD-MM-YYYY';
const timeFormat = 'HH:mm';
const dateTimeFormat = `${dateFormat} ${timeFormat}`;

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [FlatpickerComponent],
})
export class DateTimePickerComponent implements OnInit {
  @ViewChild(FlatpickerComponent) flatPicker: FlatpickerComponent;
  isRelative = true;
  selectedDateString = moment().format(dateTimeFormat);
  selectedDate = new Date().toUTCString();
  flatpickerOptions: FlatpickrOptions = {
    dateFormat: 'd-m-Y H:i',
    minDate: 'today',
    minTime: this.getMinTime(),
    defaultDate: '',
    enableTime: true,
    defaultHour: '06',
    defaultMinute: '55',
    time_24hr: true,
    wrap: true,
    onChange: this.onDatePickerChange.bind(this),
    onOpen: this.onOpen.bind(this),
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {

  }

  getMinTime(): string {
    return `${moment(this.selectedDate).hours()}:${moment(this.selectedDate).minutes()}`;
  }

  onDatePickerChange(val: Date[]) {
    if (this.isRelative) {
      this.selectedDate = val[0].toUTCString();
    }
  }

  onTimezoneChange(selectedZone: string) {
    this.selectedDateString = moment.tz(this.selectedDate, selectedZone).format(dateTimeFormat);
  }

  onOpen() {
    // this.flatPicker.config = { ...this.flatpickerOptions, minTime: this.getMinTime() };
  }

  getMessage(isRelative: boolean) {
    return isRelative ? 'Relative Mode Conversion' : `Initial Mode Conversion(${this.selectedDate})`;
  }
}
