import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenSignup } from './citizen-signup';

describe('CitizenSignup', () => {
  let component: CitizenSignup;
  let fixture: ComponentFixture<CitizenSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenSignup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenSignup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
