import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoredFile } from '../../../../core/services/file/file.service';
import { selectLoadFilesStatus, selectTrackCovers } from '../../../track/state/track.reducer';
import { TrackActions } from '../../../track/state/track.actions';
import { Track } from '../../../track/state/track.model';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FileType } from '../../../../core/enums/file-type.enum';

@Component({
  selector: 'app-track-covers-popup',
  templateUrl: './track-covers-popup.component.html',
  styleUrl: './track-covers-popup.component.scss'
})
export class TrackCoversPopupComponent {
  @Input() track!: Track;
  @Output() close = new EventEmitter<void>()
  trackCovers$: Observable<StoredFile[]> = this.store.select(selectTrackCovers)
  status$: Observable<string> = this.store.select(selectLoadFilesStatus)
  trackCoverForm: FormGroup;
  coverFiles$: Observable<StoredFile[]> = this.store.select(selectTrackCovers);
  private coverFile!: File;


  constructor(private store: Store, private fb: FormBuilder) {
    this.trackCoverForm = this.fb.group({
      cover: ['', [Validators.required, this.coverValidator.bind(this)]],
    });
  }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTrackCovers({ trackId: this.track.id }))
  }

  async onSubmit() {
    if (this.trackCoverForm.invalid) return;
    console.log(this.coverFile);
    
    const file: StoredFile = {
      id: `audio-${Date.now()}-${Math.random().toString(36)}`,
      file: this.coverFile,
      type: FileType.COVER,
      name: this.coverFile.name,
      trackId: this.track.id,
      active: false
    }


    this.store.dispatch(TrackActions.uploadTrackCover({ file: file }))

  }

  coverValidator(): ValidationErrors | null {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/avif', 'image/webp'];
    const maxSize = 15 * 1024 * 1024;
    const file = this.coverFile;

    if (file) {
      console.log(file.type);    
      if (!allowedTypes.includes(file.type)) {
        return { invalidCoverType: true };
      }
      if (file!.size > maxSize) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.trackCoverForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      switch (field) {
        case 'cover':
          this.coverFile = input.files[0];
          this.trackCoverForm.get('cover')?.updateValueAndValidity();
          break;
        default:
          throw new Error("unknown property " + field)
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.track-popup-background') && !target.closest('.track-container')) {
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit();
  }
}
