import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  Observable,
  from,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  #hasLoaded = false;

  storage$ = from(this.ionicStorage.create()).pipe(shareReplay(1));
  load$: Observable<Photo[]> = this.storage$.pipe(
    switchMap((storage) => from(storage.get('photos'))),
    map((photos) => photos ?? []),
    tap(() => (this.#hasLoaded = true)),
    shareReplay(1)
  );

  f = of([1, 2, 3, 4]);

  constructor(private ionicStorage: Storage) {}

  save(photos: Photo[]) {
    if (this.#hasLoaded) {
      this.storage$.pipe(take(1)).subscribe((storage) => {
        storage.set('photos', photos);
      });
    }
  }
}
