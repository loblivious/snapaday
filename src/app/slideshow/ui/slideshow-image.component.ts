import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-image',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowImageComponent {}

@NgModule({
  declarations: [SlideshowImageComponent],
  imports: [CommonModule, IonicModule],
  exports: [SlideshowImageComponent],
})
export class SlideshowImageComponentModule {}
