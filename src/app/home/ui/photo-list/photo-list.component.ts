import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Photo } from 'src/app/shared/interfaces/photo';
import { DaysAgoPipeModule } from '../days-ago/days-ago.pipe';

@Component({
  selector: 'app-photo-list',
  template: `
    <ion-list lines="none">
      <ion-item-sliding *ngFor="let photo of photos; trackBy: trackByFn">
        <ion-item>
          <img [src]="photo.safeResourceUrl" />
          <ion-badge slot="end" color="light">
            {{ photo.dateTaken | daysAgo }}
          </ion-badge>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option (click)="delete.emit(photo.name)" color="danger">
            <ion-icon name="trash" slot="icon-only"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  styles: [
    `
      ion-list {
        padding: 0;
      }

      ion-item-sliding {
        margin-bottom: 2px;
      }

      ion-item {
        --inner-padding-end: 0px;
        --padding-start: 0px;

        img {
          width: 100%;
          height: auto;
        }
      }

      ion-badge {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent {
  @Input() photos: Photo[] = [];
  @Output() delete = new EventEmitter<string>();

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
