import { DTO } from './dto';

export interface NameDTO extends DTO {
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    languageId: number,
}
