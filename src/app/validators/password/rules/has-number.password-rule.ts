import { PasswordRule } from './password-rule';

export class HasNumberPasswordRule implements PasswordRule {

    isValid(value: string): boolean {
        return value.match(/[0-9]/) !== null;
    }

}
