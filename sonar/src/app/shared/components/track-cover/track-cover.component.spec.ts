import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCoverComponent } from './track-cover.component';

describe('TrackCoverComponent', () => {
  let component: TrackCoverComponent;
  let fixture: ComponentFixture<TrackCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackCoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
