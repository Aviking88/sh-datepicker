import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'flatpicker',
  templateUrl: './flatpicker.component.html',
  styleUrls: ['./flatpicker.component.scss']
})
export class FlatpickerComponent implements OnInit {
  @Input() flatpickerOptions;
  @Input() selectedDateString;

  constructor(public viewContRef: ViewContainerRef) { }

  ngOnInit() {
  }

}
