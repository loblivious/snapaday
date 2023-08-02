import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Photo } from 'src/app/shared/interfaces/photo';
import { DaysAgoPipeModule } from '../days-ago/days-ago.pipe';

@Component({
  selector: 'app-photo-list',
  template: `
    <ion-list lines="none">
      <ion-item *ngFor="let photo of photos; trackBy: trackByFn">
        <img [src]="photo.safeResourceUrl" />
        <ion-badge slot="end" color="light">
          {{ photo.dateTaken | daysAgo }}
        </ion-badge>
      </ion-item>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent {
  @Input() photos: Photo[] = [];

  trackByFn(index: number, photo: Photo) {
    return photo.name;
  }
}

@NgModule({
  declarations: [PhotoListComponent],
  imports: [IonicModule, CommonModule, DaysAgoPipeModule],
  exports: [PhotoListComponent],
})
export class PhotoListComponentModule {}
