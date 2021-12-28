import { DTO } from './dto';

export interface CredentialsDTO extends DTO {
    email: string;
    password: string;
}
