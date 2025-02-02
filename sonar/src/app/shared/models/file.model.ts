import { FileType } from "../../core/enums/file-type.enum";

export interface StoredFile {
  id: string;
  file: Blob;
  type: FileType;
  name: string;
  trackId: string;
  active: boolean;
}