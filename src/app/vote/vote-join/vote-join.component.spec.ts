import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteJoinComponent } from './vote-join.component';

describe('VoteJoinComponent', () => {
  let component: VoteJoinComponent;
  let fixture: ComponentFixture<VoteJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
