import { PasswordRule } from './password-rule';

export class HasBigLetterPasswordRule implements PasswordRule {

    isValid(value: string): boolean {
        return value.match(/[A-ZА-Я]/) !== null;
    }

}
