import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as momentTz from 'moment-timezone';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'time-zone-selector',
  templateUrl: './time-zone-selector.component.html',
  styleUrls: ['./time-zone-selector.component.scss'],
})
export class TimeZoneSelectorComponent implements OnInit {
  @Output() timezoneChange = new EventEmitter();
  timeZones = [];

  timezoneSelector: FormControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  constructor() {
    this.timeZones = momentTz.tz.names();
  }

  ngOnInit() {
    const currentTimeZone = moment.tz.guess();
    this.timezoneSelector.setValue(currentTimeZone);
    this.timezoneChange.emit(currentTimeZone);
    this.filteredOptions = this.timezoneSelector.valueChanges.pipe(
      map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
    return this.timeZones.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) !== -1);
  }

  onOptionSelected(value: MatAutocompleteSelectedEvent) {
    if (value.option.selected) {
      this.timezoneChange.emit(value.option.value);
    }
  }
}
