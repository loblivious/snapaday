import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PhotoService } from './data-access/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest, map } from 'rxjs';
import { PhotoListComponentModule } from './ui/photo-list/photo-list.component';

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
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-photo-list
          *ngIf="photos$ | async as photos"
          [photos]="photos"
        ></app-photo-list>
      </ion-content>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  photos$ = this.photoService.photos$.pipe(
    map((photos) =>
      photos.map((photo) => ({
        ...photo,
        safeResourceUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          photo.path
        ),
      }))
    )
  );

  vm$ = combineLatest([
    this.photos$,
    this.photoService.hasTakenPhotoToday$,
  ]).pipe(
    map(([photos, hasTakenPhotoToday]) => ({
      photos,
      hasTakenPhotoToday,
    }))
  );

  constructor(
    public photoService: PhotoService,
    private sanitizer: DomSanitizer
  ) {}
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    PhotoListComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
