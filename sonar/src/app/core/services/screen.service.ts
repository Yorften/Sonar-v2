import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private isMediumScreen = new BehaviorSubject<boolean>(false);

  isMediumScreen$ = this.isMediumScreen.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMediumScreen.next(window.innerWidth >= 768);

      fromEvent(window, 'resize')
        .pipe(
          debounceTime(100),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.isMediumScreen.next(window.innerWidth >= 768);
        });
    }
  }
}