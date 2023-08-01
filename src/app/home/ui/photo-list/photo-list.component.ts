import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-photo-list',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent {}

@NgModule({
  declarations: [PhotoListComponent],
  imports: [IonicModule, CommonModule],
  exports: [PhotoListComponent],
})
export class PhotoListComponentModule {}
