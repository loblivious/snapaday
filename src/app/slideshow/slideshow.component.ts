import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-slideshow',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowComponent {}

@NgModule({
  declarations: [SlideshowComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SlideshowComponent,
      },
    ]),
  ],
})
export class SlideshowComponentModule {}
