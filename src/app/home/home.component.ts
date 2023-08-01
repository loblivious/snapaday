import { IonicModule } from '@ionic/angular';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoService } from './data-access/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { PhotoListComponentModule } from './ui/photo-list/photo-list.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Snapaday</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="photoService.takePhoto()">
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
  `,
  styles: [``],
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

  constructor(
    protected photoService: PhotoService,
    private sanitizer: DomSanitizer
  ) {}
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    IonicModule,
    CommonModule,
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
