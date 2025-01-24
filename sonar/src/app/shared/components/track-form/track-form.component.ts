import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MusicCategory } from '../../../core/enums/music-category.enum';
import { Track } from '../../../features/track/state/track.model';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEditedTrack } from '../../../features/track/state/track.reducer';
import { TrackActions } from '../../../features/track/state/track.actions';
import { Update } from '@ngrx/entity';


@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.scss'
})
export class TrackFormComponent {

  track$: Observable<Track | null> = this.store.select(selectEditedTrack);
  editedTrack: Track | null = null;
  trackForm: FormGroup;
  categories: string[] = Object.values(MusicCategory);
  editMode$: Observable<unknown> | Subscribable<unknown> | Promise<unknown> | undefined;
  @Output() close = new EventEmitter<void>();
  private subscription: Subscription;
  private trackFile: File | null = null;
  private coverFile: File | null = null;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.trackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      category: ['', [Validators.required, this.categoryValidator.bind(this)]],
      file: ['', this.fileValidator.bind(this)],
      cover: ['', this.coverValidator.bind(this)]
    });
    this.subscription = this.track$.subscribe((track) => {
      this.editedTrack = track;
      this.updateFileFieldValidation();
    });
  }

  private updateFileFieldValidation() {
    const fileControl = this.trackForm.get('file');
    if (this.editedTrack) {
      fileControl?.clearValidators();
    } else {
      fileControl?.setValidators([Validators.required, this.fileValidator.bind(this)]);
    }
    fileControl?.updateValueAndValidity();
  }

  ngOnInit() {
    if (this.editedTrack) {
      this.trackForm.patchValue({
        id: this.editedTrack.id,
        name: this.editedTrack.name,
        author: this.editedTrack.author,
        category: this.editedTrack.category,
      })
    }
  }

  async onSubmit() {
    if (this.trackForm.invalid) return;
    const trackData = this.trackForm.value;

    if (this.editedTrack) {
      // Edit Track
      const trackUpdate: Update<Track> = {
        id: this.editedTrack.id,
        changes: {
          ...this.editedTrack,
          ...trackData
        }
      };
      console.log(trackUpdate);
      this.store.dispatch(TrackActions.updateTrack({ track: trackUpdate }))

    } else {
      // Create Track

      // Get the track duration
      const duration = await this.getTrackDuration();

      const track: Track = {
        ...trackData,
        id: `tack-${Date.now()}-${Math.random().toString(36)}`,
        duration: duration,
        creationDate: new Date(),
      }

      const uploadProps = {
        trackFile: this.trackFile!,
        coverFile: this.coverFile,
        trackId: track.id
      }

      this.store.dispatch(TrackActions.uploadTrackFiles(uploadProps))
      this.store.dispatch(TrackActions.addTrack({ track: track }))
    }

    this.closeForm();
  }

  getTrackDuration(): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(this.trackFile!);

      audio.src = objectUrl;

      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        URL.revokeObjectURL(objectUrl);
        resolve(duration);
      });

      // Handle any errors
      audio.addEventListener('error', (error) => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load audio metadata'));
      });
    });
  }



  // Validators
  isFieldInvalid(fieldName: string): boolean {
    const field = this.trackForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }


  categoryValidator(control: AbstractControl): ValidationErrors | null {
    return this.categories.includes(control.value)
      ? null
      : { invalidCategory: true };
  }


  fileValidator(): ValidationErrors | null {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];
    const maxSize = 17 * 1024 * 1024;
    const file = this.trackFile;

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

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      switch (field) {
        case 'file':
          this.trackFile = input.files[0];
          this.trackForm.get('file')?.updateValueAndValidity();
          break;
        case 'cover':
          this.coverFile = input.files[0];
          this.trackForm.get('cover')?.updateValueAndValidity();
          break;
        default:
          throw new Error("unknown property " + field)
      }
    }
  }


  // Pupup methods
  closeForm() {
    this.close.emit();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.task-popup-background') && !target.closest('.task-form-container')) {
      this.closeForm();
    }
  }

  // Unsubscribe and empty edited task if it exists
  ngOnDestroy() {
    if (this.editedTrack) {
      this.store.dispatch(TrackActions.clearEditedTrack());
    }

    this.subscription.unsubscribe();
  }
}
