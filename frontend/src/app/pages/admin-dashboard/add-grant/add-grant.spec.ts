import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrant } from './add-grant';

describe('AddGrant', () => {
  let component: AddGrant;
  let fixture: ComponentFixture<AddGrant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGrant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGrant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
