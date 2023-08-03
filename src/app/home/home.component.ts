import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoService } from './data-access/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { PhotoListComponentModule } from './ui/photo-list/photo-list.component';
import { SlideshowComponentModule } from '../slideshow/slideshow.component';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header>
        <ion-toolbar color="danger">
          <ion-title>Snapaday</ion-title>
          <ion-buttons slot="end">
            <ion-button
              (click)="photoService.takePhoto()"
              [disabled]="vm.hasTakenPhotoToday"
            >
              <ion-icon name="camera-outline" slot="icon-only"></ion-icon>
            </ion-button>
            <ion-button
              (click)="modalIsOpen$.next(true)"
              [disabled]="vm.modalIsOpen || vm.photos.length === 0"
            >
              <ion-icon name="play" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-photo-list
          [photos]="vm.photos"
          (delete)="photoService.deletePhoto($event)"
        ></app-photo-list>
        <ion-modal
          [isOpen]="vm.modalIsOpen"
          [canDismiss]="true"
          [presentingElement]="routerOutlet.nativeEl"
          (ionModalDidDismiss)="modalIsOpen$.next(false)"
        >
          <ng-template>
            <app-slideshow [photos]="vm.photos"></app-slideshow>
          </ng-template>
        </ion-modal>
      </ion-content>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  #photos$ = this.photoService.photos$.pipe(
    map((photos) =>
      photos.map((photo) => ({
        ...photo,
        safeResourceUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          photo.path
        ),
      }))
    )
  );
  protected modalIsOpen$ = new BehaviorSubject<boolean>(false);

  vm$ = combineLatest([
    this.#photos$,
    this.modalIsOpen$,
    this.photoService.hasTakenPhotoToday$,
  ]).pipe(
    map(([photos, modalIsOpen, hasTakenPhotoToday]) => ({
      photos,
      modalIsOpen,
      hasTakenPhotoToday,
    }))
  );

  constructor(
    protected photoService: PhotoService,
    private sanitizer: DomSanitizer,
    protected routerOutlet: IonRouterOutlet
  ) {}
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    IonicModule,
    CommonModule,
    PhotoListComponentModule,
    SlideshowComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
