import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Track } from '../../../track/state/track.model';

@Component({
  selector: 'app-track-settings',
  templateUrl: './track-settings.component.html',
  styleUrl: './track-settings.component.scss'
})
export class TrackSettingsComponent {
  @Input() track!: Track;
  @Input() isOpen: boolean = false; // Menu state controlled by parent
  @Output() open = new EventEmitter<Track>();
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();
  isOpenFilesPopup: boolean = false;
  isOpenCoversPopup: boolean = false;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-button')) {
      this.closeMenu.emit();
    }
  }

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  editTrack() {
    this.open.emit(this.track);
  }

  closeFilesPopup() {
    this.isOpenFilesPopup = false;
  }

  closeCoversPopup() {
    this.isOpenCoversPopup = false;
  }
}
