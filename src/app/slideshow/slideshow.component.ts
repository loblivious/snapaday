import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-slideshow',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content></ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowComponent {}

@NgModule({
  declarations: [SlideshowComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SlideshowComponent,
      },
    ]),
  ],
})
export class SlideshowComponentModule {}
