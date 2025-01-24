import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-audio-button',
  templateUrl: './audio-button.component.html',
  styleUrl: './audio-button.component.scss'
})
export class AudioButtonComponent {
  volume: number = 100;
  isOpen: boolean = false;
  @Output() setVolume = new EventEmitter<number>();


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.volume-container') && !target.closest('.volume-button')) {
      this.isOpen = false;
    }
  }

  updateValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const parentElement = input.parentNode as HTMLElement;

    parentElement?.style.setProperty('--value', value);

    this.volume = parseFloat(value);

    this.setVolume.emit(this.volume)
  }
}
