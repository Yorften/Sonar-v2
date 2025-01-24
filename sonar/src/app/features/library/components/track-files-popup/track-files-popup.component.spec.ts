import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFilesPopupComponent } from './track-files-popup.component';

describe('TrackFilesPopupComponent', () => {
  let component: TrackFilesPopupComponent;
  let fixture: ComponentFixture<TrackFilesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackFilesPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackFilesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
