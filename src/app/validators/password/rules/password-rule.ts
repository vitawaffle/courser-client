export interface PasswordRule {
    isValid: (value: string) => boolean,
}
