import { DTO } from './dto';

export interface PasswordRulesDTO extends DTO {
    HasBigLetterPasswordRule?: string,
    HasNumberPasswordRule?: string,
    HasSmallLetterPasswordRule?: string,
    LengthPasswordRule?: string,
}
