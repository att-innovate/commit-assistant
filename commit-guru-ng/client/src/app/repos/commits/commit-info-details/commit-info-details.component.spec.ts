import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitInfoDetailsComponent } from './commit-info-details.component';

describe('CommitInfoDetailsComponent', () => {
  let component: CommitInfoDetailsComponent;
  let fixture: ComponentFixture<CommitInfoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitInfoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
