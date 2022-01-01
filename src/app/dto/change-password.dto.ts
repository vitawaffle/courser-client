import { DTO } from './dto';

export interface ChangePasswordDTO extends DTO {
    oldPassword: string,
    newPassword: string
}
