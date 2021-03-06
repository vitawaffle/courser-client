import { NumberIdEntity } from './number-id-entity';
import { RoleEntity } from './role.entity';

export interface UserEntity extends NumberIdEntity {
    email: string;
    roles: RoleEntity[];
    emailConfirmedAt: Date;
}
