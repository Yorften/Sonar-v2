import { Component, Input } from '@angular/core';
import { FileService, StoredFile } from '../../../core/services/file/file.service';
import { Track } from '../../../features/track/state/track.model';
import { FileType } from '../../../core/enums/file-type.enum';

@Component({
  selector: 'app-track-cover',
  templateUrl: './track-cover.component.html',
  styleUrl: './track-cover.component.scss'
})
export class TrackCoverComponent {
  @Input() file!: StoredFile;
  @Input() track!: Track;
  coverUrl: string | null = null;

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit() {
    this.coverUrl = URL.createObjectURL(this.file.file);
  }

  async setAsActive() {
    try {
      await this.fileService.updateFileActiveStatus(this.file.id, this.track.id, FileType.COVER);
    } catch (error) {
      console.error('Error setting active audio:', error);
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.coverUrl!);
  }
}
