import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitInfoCatComponent } from './commit-info-cat.component';

describe('CommitInfoCatComponent', () => {
  let component: CommitInfoCatComponent;
  let fixture: ComponentFixture<CommitInfoCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitInfoCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitInfoCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
