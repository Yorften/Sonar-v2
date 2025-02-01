import { Component, HostListener } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrl: './album-menu.component.scss'
})
export class AlbumMenuComponent {
  isOpen: boolean = false;
  router: Router = new Router();
  private subscription: Subscription = new Subscription();

  constructor(private screenService: ScreenService) { }

  openMenu() {
    this.isOpen = !this.isOpen;
    this.router.navigate(["albums"]);
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
