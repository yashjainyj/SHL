/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Login_signupComponent } from './login_signup.component';

describe('Login_signupComponent', () => {
  let component: Login_signupComponent;
  let fixture: ComponentFixture<Login_signupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login_signupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login_signupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
