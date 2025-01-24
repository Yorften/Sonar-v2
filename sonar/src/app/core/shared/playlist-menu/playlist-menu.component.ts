import { Component, HostListener } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-menu',
  templateUrl: './playlist-menu.component.html',
  styleUrl: './playlist-menu.component.scss'
})
export class PlaylistMenuComponent {
  isOpen: boolean = false;
  router: Router = new Router();
  private subscription: Subscription = new Subscription();

  constructor(private screenService: ScreenService) { }

  openMenu() {
    this.isOpen = !this.isOpen;
    this.router.navigate(["playlists"]);
    }

  ngOnInit() {
    this.subscription = this.screenService.isMediumScreen$.subscribe(isMedium => {
      this.isOpen = isMedium;
    });
    this.isOpen = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
