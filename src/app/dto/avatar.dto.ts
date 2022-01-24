import { DTO } from './dto';
import { FileDTO } from './file.dto';

export interface AvatarDTO extends DTO {
    id?: number;
    file: FileDTO;
}
