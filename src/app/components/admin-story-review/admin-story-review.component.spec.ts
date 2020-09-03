import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoryReviewComponent } from './admin-story-review.component';

describe('AdminStoryReviewComponent', () => {
  let component: AdminStoryReviewComponent;
  let fixture: ComponentFixture<AdminStoryReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStoryReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoryReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
