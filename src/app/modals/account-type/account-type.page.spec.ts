import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypePage } from './account-type.page';

describe('AccountTypePage', () => {
  let component: AccountTypePage;
  let fixture: ComponentFixture<AccountTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
