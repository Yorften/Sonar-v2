import { Component, Input } from '@angular/core';
import { FileService, StoredFile } from '../../../core/services/file/file.service';
import { Track } from '../../../features/track/state/track.model';
import { FileType } from '../../../core/enums/file-type.enum';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.scss'
})
export class MiniPlayerComponent {
  @Input() file!: StoredFile;
  @Input() track!: Track;
  audioUrl: string | null = null;

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit() {
    this.audioUrl = URL.createObjectURL(this.file.file);
  }

  async setAsActive() {
    try {
      await this.fileService.updateFileActiveStatus(this.file.id, this.track.id, FileType.AUDIO);
    } catch (error) {
      console.error('Error setting active audio:', error);
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.audioUrl!);
  }

}
