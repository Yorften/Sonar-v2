import { Injectable } from '@angular/core';
import { IndexedDbService } from '../db/indexed-db.service';
import { FileType } from '../../enums/file-type.enum';

export interface StoredFile {
  id: string;
  file: Blob;
  type: FileType;
  name: string;
  trackId: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly storeName = 'files';

  constructor(private db: IndexedDbService) { }


  async storeFiles(trackFile: File, coverFile: File | null, trackId: string): Promise<boolean> {
    await this.db.initialize();
    try {
      const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36)}`;

      // Store track file
      await this.storeFile({
        id: generateId("audio"),
        file: trackFile,
        type: FileType.AUDIO,
        name: trackFile.name,
        trackId: trackId,
        active: true
      });

      // Store cover file if it exists
      if (coverFile) {
        await this.storeFile({
          id: generateId("cover"),
          file: coverFile,
          type: FileType.COVER,
          name: coverFile.name,
          trackId: trackId,
          active: true
        });
      }

      return true;
    } catch (error) {
      console.error('Error storing files:', error);
      return false;
    }
  }

  async storeFile(fileData: StoredFile): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readwrite');
        const request = store.add(fileData);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getFilesByTrackId(trackId: string, fileType: FileType): Promise<StoredFile[]> {
    await this.db.initialize();

    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readonly');
        const index = store.index('trackId');
        const request = index.openCursor(IDBKeyRange.only(trackId));

        const files: StoredFile[] = [];

        request.onsuccess = (event: Event) => {
          const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
          if (cursor) {
            const storedFile = cursor.value as StoredFile;
            if (storedFile.type === fileType) {
              files.push(cursor.value);
            }
            cursor.continue();
          } else {
            resolve(files);
          }
        };

        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }


  async getFileByTrackId(trackId: string, fileType: FileType): Promise<StoredFile | null> {
    await this.db.initialize();

    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readonly');
        const index = store.index('trackId'); // Use the trackId index

        const request = index.openCursor(IDBKeyRange.only(trackId));

        request.onsuccess = (event: Event) => {
          const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;

          if (cursor) {
            const storedFile = cursor.value as StoredFile;
            if (storedFile.active && storedFile.type === fileType) {
              resolve(storedFile);
            } else {
              cursor.continue();
            }
          } else {
            resolve(null);
          }
        };

        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async updateFileActiveStatus(fileId: string, trackId: string, fileType: FileType): Promise<void> {
    await this.db.initialize();

    return new Promise((resolve, reject) => {
      try {
        this.getFilesByTrackId(trackId, fileType).then(files => {
          const store = this.db.getTransaction(this.storeName, 'readwrite');

          const updatePromises = files.map(file => {
            return new Promise<void>((resolveUpdate, rejectUpdate) => {
              const updateRequest = store.put({
                ...file,
                active: file.id === fileId
              });
              updateRequest.onsuccess = () => resolveUpdate();
              updateRequest.onerror = () => rejectUpdate(updateRequest.error);
            });
          });

          Promise.all(updatePromises)
            .then(() => resolve())
            .catch(error => reject(error));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteFile(fileId: string): Promise<boolean> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readwrite');
        const request = store.delete(fileId);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
      } catch (error) {
        reject(error);
      }
    });
  }

}
