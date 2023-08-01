import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: '',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowImageComponent {}

@NgModule({
  declarations: [SlideshowImageComponent],
  imports: [IonicModule, CommonModule],
  exports: [SlideshowImageComponent],
})
export class SlideshowImageComponentModule {}
