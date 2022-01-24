import { PasswordRule } from './password-rule';

export class HasBigLetterPasswordRule implements PasswordRule {

    isValid(value: string) {
        return value.match(/[A-ZА-Я]/) !== null;
    }

}
