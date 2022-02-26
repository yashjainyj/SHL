/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RenewUpdateSlotComponent } from './renewUpdateSlot.component';

describe('RenewUpdateSlotComponent', () => {
  let component: RenewUpdateSlotComponent;
  let fixture: ComponentFixture<RenewUpdateSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewUpdateSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewUpdateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
