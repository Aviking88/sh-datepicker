import { Component, ViewEncapsulation, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FlatpickerComponent } from '../flatpicker/flatpicker.component';

const DATE_FORMAT = 'YYYY-MM-DD';

const TIME_FORMAT = 'HH:mm';
const INVERT_DATE_FORMAT = `DD-MM-YYYY ${TIME_FORMAT}`;
const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateTimePickerComponent {
  @ViewChild(FlatpickerComponent) flatPicker: FlatpickerComponent;

  selectedDateUTC: string;

  CLIENT_TIMEZONE = moment.tz.guess();
  selectedZone: string = this.CLIENT_TIMEZONE;

  selectedMoment = moment.tz((this.getDateTime(moment().toDate()), this.CLIENT_TIMEZONE));

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
  };

  lastSelectedDate: Date = moment().toDate();

  constructor() {}

  getMinTime(): string {
    return `${this.selectedMoment.hours()}:${this.selectedMoment.minutes()}`;
  }

  onDatePickerChange(val: Date[]) {
    if (val[0]) {
      this.lastSelectedDate = val[0];
    }
  }

  /**
   * This gets triggered whenever time-zone is changed, It updates selectedDateUTC based on passed time-zone
   * @param selectedZone string
   */
  onTimezoneChange(selectedZone: string) {
    this.selectedMoment = moment.tz(this.getDateTime(this.lastSelectedDate), this.selectedZone);
    this.selectedZone = selectedZone;
    // To avoid console error if datepicker is not initialized.
    setTimeout(() => {
      this.selectedDateUTC = this.selectedMoment
        .clone()
        .tz(this.selectedZone)
        .format(INVERT_DATE_FORMAT);
    }, 0);
  }

  getMessageForPanelHeading(isRelative: boolean) {
    return isRelative ? 'Relative Mode Conversion' : `Initial Mode Conversion(${this.selectedMoment.toDate().toUTCString()})`;
  }

  getDateTime(passedDate: Date) {
    const p = `${passedDate.getFullYear()}-${
      passedDate.getMonth() + 1 > 9 ? passedDate.getMonth() + 1 : `0${passedDate.getMonth() + 1}`
    }-${passedDate.getDate()} ${passedDate.getHours()}:${passedDate.getMinutes()}`;

    return p;
  }
}
