import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take } from 'rxjs';
import { Track } from '../../../../features/track/state/track.model';
import { selectActiveTrack, selectAll, selectError, selectTrackAudio, selectTrackAudioStatus, selectTrackCover, selectTrackCoverStatus } from '../../../../features/track/state/track.reducer';
import { isPlatformBrowser } from '@angular/common';
import { StoredFile } from '../../../services/file/file.service';
import { TrackActions } from '../../../../features/track/state/track.actions';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  currentTime: number = 0;
  private _volume: number = 100;
  isPlaying: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectAll);
  activeTrack$: Observable<Track | null> = this.store.select(selectActiveTrack)
  trackAudio$: Observable<StoredFile | null> = this.store.select(selectTrackAudio)
  trackCover$: Observable<StoredFile | null> = this.store.select(selectTrackCover)

  trackStatus$: Observable<string> = this.store.select(selectTrackAudioStatus)
  coverStatus$: Observable<string> = this.store.select(selectTrackCoverStatus)
  error$: Observable<string | null> = this.store.select(selectError)

  bothSuccess$ = combineLatest([
    this.trackStatus$,
    this.coverStatus$
  ]).pipe(
    map(([trackStatus, coverStatus]) =>
      trackStatus === 'success' && coverStatus === 'success'
    )
  );

  bothLoading$ = combineLatest([
    this.trackStatus$,
    this.coverStatus$
  ]).pipe(
    map(([trackStatus, coverStatus]) =>
      trackStatus === 'loading' || coverStatus === 'loading'
    )
  );

  bothIdle$ = combineLatest([
    this.trackStatus$,
    this.coverStatus$
  ]).pipe(
    map(([trackStatus, coverStatus]) =>
      trackStatus === 'idle' || coverStatus === 'idle'
    )
  );


  audio!: HTMLAudioElement;
  url: string | null = null;
  private objectUrls: string[] = [];
  private timerId: any = null // The interval

  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.addEventListener('ended', () => {
        this.playNextTrack();
      })
    }
  }

  ngOnInit() {
    this.activeTrack$.subscribe((activeTrack) => {
      if (activeTrack) {
        this.onActiveTrackChange(activeTrack);
      }
    });
    this.trackAudio$.subscribe((audioFile) => {
      if (audioFile) {
        this.onAudioFileChange(audioFile);
      }
    });
    this.trackCover$.subscribe((coverFile) => {
      if (coverFile) {
        this.onCoverFileChange(coverFile);
      }
    });
  }

  onCoverFileChange(coverFile: StoredFile) {
    if (this.url) {
      URL.revokeObjectURL(this.url);
    }
    this.url = URL.createObjectURL(coverFile.file);
    this.objectUrls.push(this.url);

  }

  onAudioFileChange(audioFile: StoredFile) {
    const url = URL.createObjectURL(audioFile.file);
    this.objectUrls.push(url);
    this.audio.src = url;
    this.isPlaying = true;
    this.currentTime = 0;

    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(() => {
      this.currentTime = this.currentTime + 0.1
    }, 100);

    // If the user changed the volume before playing a track     
    this.audio.volume = this.volume / 100

    // Play the track
    this.audio.play();
  }

  onActiveTrackChange(track: Track) {
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url))
    this.url = null;
    this.store.dispatch(TrackActions.loadTrackAudio({ trackId: track.id }))
    this.store.dispatch(TrackActions.loadTrackCover({ trackId: track.id }))
  }

  togglePlayer() {
    if (this.isPlaying) {
      this.audio.pause();
      // Pause the incrementing
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    } else {
      this.audio.play();
      // Resume incrementing currentTime
      this.timerId = setInterval(() => {
        this.currentTime = this.currentTime + 0.1
      }, 100);
    }
    this.isPlaying = !this.isPlaying
  }

  updateValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const parentElement = input.parentNode as HTMLElement;

    // Update the parent node's custom property
    parentElement?.style.setProperty('--value', value);

    // Optionally update currentTime for live updates
    this.currentTime = parseFloat(value);
  }

  updateVolume(volume: number) {
    this.volume = volume;
  }

  updateTrackProgress(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const floatValue = parseFloat(value)
    this.audio.currentTime = floatValue;
  }

  playNextTrack() {
    combineLatest([this.tracks$, this.activeTrack$])
      .pipe(
        take(1)
      )
      .subscribe(([tracks, activeTrack]) => {
        if (!activeTrack || !tracks || tracks.length === 0) return;
        
        const currentIndex = tracks.findIndex(track => track.id === activeTrack.id);
        const nextIndex = (currentIndex + 1) % tracks.length;
        const nextTrack = tracks[nextIndex];

        if (nextTrack) {
          this.store.dispatch(TrackActions.playTrack({ track: nextTrack }));
        }
      });
  }

  playPreviousTrack() {
    combineLatest([this.tracks$, this.activeTrack$])
      .pipe(
        take(1)
      )
      .subscribe(([tracks, activeTrack]) => {
        if (!activeTrack || !tracks || tracks.length === 0) return;

        const currentIndex = tracks.findIndex(track => track.id === activeTrack.id);
        const previousIndex = (currentIndex - 1) % tracks.length;
        const nextTrack = tracks[previousIndex];

        if (nextTrack) {
          this.store.dispatch(TrackActions.playTrack({ track: nextTrack }));
        }
      });
  }

  get volume(){
    return this._volume;
  }

  set volume(value: number) {
    this._volume = value;

    // Live updates the audio volume
    if (this.audio.src) {
      this.audio.volume = value / 100
    }
  }
}
