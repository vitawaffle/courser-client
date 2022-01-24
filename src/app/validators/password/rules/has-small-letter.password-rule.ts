import { PasswordRule } from './password-rule';

export class HasSmallLetterPasswordRule implements PasswordRule {

    isValid(value: string) {
        return value.match(/[a-zа-я]/) !== null;
    }

}
