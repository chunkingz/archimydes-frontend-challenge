import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoryListComponent } from './admin-story-list.component';

describe('AdminStoryListComponent', () => {
  let component: AdminStoryListComponent;
  let fixture: ComponentFixture<AdminStoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
