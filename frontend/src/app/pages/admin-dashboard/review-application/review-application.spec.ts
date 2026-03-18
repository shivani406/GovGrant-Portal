import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApplication } from './review-application';

describe('ReviewApplication', () => {
  let component: ReviewApplication;
  let fixture: ComponentFixture<ReviewApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewApplication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
