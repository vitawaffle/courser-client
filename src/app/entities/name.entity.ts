import { Entity } from './entity';
import { NameId } from './name-id';

export interface NameEntity extends Entity {
    id?: NameId,
    firstName?: string,
    lastName?: string,
    patronymic?: string,
}
