import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentReposComponent } from './recent-repos.component';

describe('RecentReposComponent', () => {
  let component: RecentReposComponent;
  let fixture: ComponentFixture<RecentReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
