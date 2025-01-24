import { TestBed } from '@angular/core/testing';
import { TrackService } from './track.service';
import { IndexedDbService } from '../../../core/services/db/indexed-db.service';
import { Track } from '../state/track.model';
import { Update } from '@ngrx/entity';
import { MusicCategory } from '../../../core/enums/music-category.enum';

describe('TrackService', () => {
  let service: TrackService;
  let dbServiceMock: jasmine.SpyObj<IndexedDbService>;

  const mockTracks: Track[] = [
    {
      id: '1', name: 'Track 1', duration: 200,
      author: '',
      category: MusicCategory.POP,
      creationDate: new Date()
    },
    {
      id: '2', name: 'Track 2', duration: 300,
      author: '',
      category: MusicCategory.POP,
      creationDate: new Date()
    },
  ];

  beforeEach(() => {
    // Create a spy object for IndexedDbService
    dbServiceMock = jasmine.createSpyObj('IndexedDbService', ['initialize', 'getTransaction']);

    TestBed.configureTestingModule({
      providers: [
        TrackService,
        { provide: IndexedDbService, useValue: dbServiceMock }
      ]
    });

    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addTrack', () => {
    it('should add a track and return it', async () => {
      const newTrack: Track = {
        id: '3', name: 'New Track', duration: 400,
        author: '',
        category: MusicCategory.POP,
        creationDate: new Date()
      };
      const storeMock = {
        add: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0); // Simulate async success
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      const result = await service.addTrack(newTrack);
      expect(result).toEqual(newTrack);
      expect(storeMock.add).toHaveBeenCalledWith(newTrack);
    });

    it('should throw an error if adding a track fails', async () => {
      const newTrack: Track = {
        id: '3', name: 'New Track', duration: 400,
        author: '',
        category: MusicCategory.POP,
        creationDate: new Date()
      };
      const storeMock = {
        add: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
          } as unknown as IDBRequest;
          setTimeout(() => request.onerror && request.onerror({} as Event), 0); // Simulate async error
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      await expectAsync(service.addTrack(newTrack)).toBeRejected();
      expect(storeMock.add).toHaveBeenCalledWith(newTrack);
    });
  });

  describe('getTrackById', () => {
    it('should return a track if found', async () => {
      const storeMock = {
        get: jasmine.createSpy().and.callFake(() => {
          const request = {
            onsuccess: null,
            onerror: null,
            result: mockTracks[0]
          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0);
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      const result = await service.getTrackById('1');
      expect(result).toEqual(mockTracks[0]);
      expect(storeMock.get).toHaveBeenCalledWith('1');
    });

    it('should return null if the track is not found', async () => {
      const storeMock = {
        get: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
            result: null
          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0);
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      const result = await service.getTrackById('non-existent-id');
      expect(result).toBeNull();
      expect(storeMock.get).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('getAllTracks', () => {
    it('should return all tracks', async () => {
      const storeMock = {
        getAll: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
            result: mockTracks

          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0);
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      const result = await service.getAllTracks();
      expect(result).toEqual(mockTracks);
      expect(storeMock.getAll).toHaveBeenCalled();
    });
  });

  describe('updateTrack', () => {
    it('should update a track if it exists', async () => {
      const update: Update<Track> = {
        id: '1',
        changes: { name: 'Updated Track 1' }
      };

      const storeMock = {
        get: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0);
          return request;
        }),
        put: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0);
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      const result = await service.updateTrack(update);
      expect(result.changes.name).toEqual('Updated Track 1');
      expect(storeMock.put).toHaveBeenCalled();
    });
  });

  describe('deleteTrackById', () => {
    it('should delete a track by its ID', async () => {
      const storeMock = {
        delete: jasmine.createSpy().and.callFake(() => {
          const request: IDBRequest = {
            onsuccess: null,
            onerror: null,
          } as unknown as IDBRequest;
          setTimeout(() => request.onsuccess && request.onsuccess({} as Event), 0);
          return request;
        })
      };

      dbServiceMock.getTransaction.and.returnValue(storeMock as any);

      const result = await service.deleteTrackById('1');
      expect(result).toEqual('1');
      expect(storeMock.delete).toHaveBeenCalledWith('1');
    });
  });
});
