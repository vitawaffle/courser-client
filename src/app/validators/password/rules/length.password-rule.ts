import { PasswordRule } from './password-rule';

export class LengthPasswordRule implements PasswordRule {

    constructor(private minimalPasswordLength: number) { }

    isValid(value: string): boolean {
        return value.length >= this.minimalPasswordLength;
    }

}
