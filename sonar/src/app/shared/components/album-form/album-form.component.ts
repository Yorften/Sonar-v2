import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Album } from '../../models/album.model';
import { selectEditedAlbum } from '../../../features/album/state/album.reducer';
import { AlbumActions } from '../../../features/album/state/album.actions';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html'
})
export class AlbumFormComponent {

  album$: Observable<Album | null> = this.store.select(selectEditedAlbum);
  editedAlbum: Album | null = null;
  albumForm: FormGroup;
  editMode$: Observable<unknown> | Subscribable<unknown> | Promise<unknown> | undefined;
  @Output() close = new EventEmitter<void>();
  private subscription: Subscription;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.albumForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      artist: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[0-9]{4}$')]],
    });
    this.subscription = this.album$.subscribe((album) => {
      this.editedAlbum = album;
    });
  }


  ngOnInit() {
    if (this.editedAlbum) {
      this.albumForm.patchValue({
        id: this.editedAlbum.id,
        title: this.editedAlbum.title,
        artist: this.editedAlbum.artist,
        year: this.editedAlbum.year,
      })
    }
  }

  async onSubmit() {
    if (this.albumForm.invalid) return;
    const albumData = this.albumForm.value;

    if (this.editedAlbum) {
      // Edit Album
      const albumUpdate: Update<Album> = {
        id: this.editedAlbum.id,
        changes: {
          ...this.editedAlbum,
          ...albumData
        }
      };
      this.store.dispatch(AlbumActions.updateAlbum({ album: albumUpdate }))

    } else {
      // Create Album

      const album: Album = {
        ...albumData,
      }

      this.store.dispatch(AlbumActions.addAlbum({ album: album }))
    }

    this.closeForm();
  }


  // Validators
  isFieldInvalid(fieldName: string): boolean {
    const field = this.albumForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // Pupup methods
  closeForm() {
    this.close.emit();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.album-popup-background') && !target.closest('.album-form-container')) {
      this.closeForm();
    }
  }

  // Unsubscribe and empty edited album if it exists
  ngOnDestroy() {
    if (this.editedAlbum) {
      this.store.dispatch(AlbumActions.clearEditedAlbum());
    }

    this.subscription.unsubscribe();
  }
}
