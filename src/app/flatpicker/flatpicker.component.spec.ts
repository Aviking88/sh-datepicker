import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatpickerComponent } from './flatpicker.component';

describe('FlatpickerComponent', () => {
  let component: FlatpickerComponent;
  let fixture: ComponentFixture<FlatpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
