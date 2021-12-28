import { Entity } from './entity';
import { RoleEntity } from './role.entity';

export interface UserEntity extends Entity {
    email: string;
    password: string;
    roles: RoleEntity[];
    emailConfirmedAt: Date;
}
