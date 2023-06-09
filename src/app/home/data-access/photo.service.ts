import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/data-access/storage.service';
import { Photo } from 'src/app/shared/interfaces/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  #photos$ = new BehaviorSubject<Photo[]>([]);
  photos$ = this.#photos$.pipe(
    tap((photos) => this.storageService.save(photos))
  );

  hasTakenPhotoToday$ = this.#photos$.pipe(
    map((photos) =>
      photos.find(
        (photo) =>
          new Date().setHours(0, 0, 0, 0) ===
          new Date(photo.dateTaken).setHours(0, 0, 0, 0)
      )
    )
  );

  constructor(
    private platform: Platform,
    private storageService: StorageService
  ) {}

  load() {
    this.storageService.load$.pipe(take(1)).subscribe((photos) => {
      this.#photos$.next(photos);
    });
  }

  async takePhoto() {
    const options: ImageOptions = {
      quality: 50,
      width: 600,
      allowEditing: false,
      resultType: this.platform.is('capacitor')
        ? CameraResultType.Uri
        : CameraResultType.DataUrl,
      source: CameraSource.Camera,
    };

    try {
      const photo = await Camera.getPhoto(options);
      const uniqueName = Date.now().toString();

      if (this.platform.is('capacitor') && photo.path) {
        const photoOnFileSystem = await Filesystem.readFile({
          path: photo.path,
        });

        const fileName = `${uniqueName}.jpeg`;
        const permanentFile = await Filesystem.writeFile({
          data: photoOnFileSystem.data,
          path: fileName,
          directory: Directory.Data,
        });

        this.addPhoto(fileName, Capacitor.convertFileSrc(permanentFile.uri));
      } else if (photo.dataUrl) {
        this.addPhoto(uniqueName, photo.dataUrl);
      }
    } catch (err) {
      console.log(err);
      throw new Error('Could not save photo');
    }
  }

  addPhoto(name: string, path: string) {
    const newPhotos = [
      {
        name,
        path,
        dateTaken: new Date().toISOString(),
      },
      ...this.#photos$.value,
    ];

    this.#photos$.next(newPhotos);
  }

  async deletePhoto(name: string) {
    const newPhotos = this.#photos$.value.filter(
      (photo) => photo.name !== name
    );

    this.#photos$.next(newPhotos);

    if (this.platform.is('capacitor')) {
      await Filesystem.deleteFile({
        path: name,
        directory: Directory.Data,
      });
    }
  }
}
