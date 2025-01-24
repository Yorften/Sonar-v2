import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoredFile } from '../../../../core/services/file/file.service';
import { selectError, selectLoadFilesStatus, selectTrackAudios } from '../../../track/state/track.reducer';
import { Track } from '../../../track/state/track.model';
import { TrackActions } from '../../../track/state/track.actions';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FileType } from '../../../../core/enums/file-type.enum';

@Component({
  selector: 'app-track-files-popup',
  templateUrl: './track-files-popup.component.html',
  styleUrl: './track-files-popup.component.scss'
})
export class TrackFilesPopupComponent {
  @Input() track!: Track;
  @Output() close = new EventEmitter<void>();
  trackAudioForm: FormGroup;
  audioFiles$: Observable<StoredFile[]> = this.store.select(selectTrackAudios);
  status$: Observable<string> = this.store.select(selectLoadFilesStatus);
  private audioFile!: File;



  constructor(private store: Store, private fb: FormBuilder) {
    this.trackAudioForm = this.fb.group({
      file: ['', [Validators.required ,this.fileValidator.bind(this)]],
    });
  }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTrackAudios({ trackId: this.track.id }))
  }

  async onSubmit() {
    if (this.trackAudioForm.invalid) return;
    const fileData = this.trackAudioForm.value;

    const file: StoredFile = {
      id: `audio-${Date.now()}-${Math.random().toString(36)}`,
      file: this.audioFile,
      type: FileType.AUDIO,
      name: this.audioFile.name,
      trackId: this.track.id,
      active: false
    }


    this.store.dispatch(TrackActions.uploadTrackFile({file: file}))

  }

  fileValidator(): ValidationErrors | null {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];
    const maxSize = 17 * 1024 * 1024;
    const file = this.audioFile;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        return { invalidFileType: true };
      }
      if (file.size > maxSize) {
        return { fileTooLarge: true };
      }

    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.trackAudioForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      switch (field) {
        case 'file':
          this.audioFile = input.files[0];
          this.trackAudioForm.get('file')?.updateValueAndValidity();
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
