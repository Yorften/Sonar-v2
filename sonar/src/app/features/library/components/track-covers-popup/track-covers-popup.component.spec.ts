import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCoversPopupComponent } from './track-covers-popup.component';

describe('TrackCoversPopupComponent', () => {
  let component: TrackCoversPopupComponent;
  let fixture: ComponentFixture<TrackCoversPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackCoversPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackCoversPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
