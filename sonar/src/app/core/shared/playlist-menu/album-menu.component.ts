import { Component, HostListener } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll } from '../../../features/album/state/album.reducer';
import { Album } from '../../../shared/models/album.model';
import { AlbumActions } from '../../../features/album/state/album.actions';

@Component({
  selector: 'app-album-menu',
  templateUrl: './album-menu.component.html',
  styleUrl: './album-menu.component.scss'
})
export class AlbumMenuComponent {
  isOpen: boolean = false;
  router: Router = new Router();
  albums$: Observable<Album[]> = this.store.select(selectAll);
  private subscription: Subscription = new Subscription();

  constructor(private screenService: ScreenService, private store: Store) { }

  openMenu() {
    this.isOpen = !this.isOpen;
    this.router.navigate(["albums"]);
  }

  ngOnInit() {
    this.subscription = this.screenService.isMediumScreen$.subscribe(isMedium => {
      this.isOpen = isMedium;
    });
    this.isOpen = false;

    this.store.dispatch(AlbumActions.loadAlbums());

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
