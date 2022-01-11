export interface HandlingArguments {
    onSuccess?: () => void,
    onFinal?: () => void,
    onError?: (error?: any) => void,
    onUnauthorized?: () => void,
    onBadRequest?: (errors?: ValidationErrors) => void,
}

export interface ValidationErrors {
    [fieldName: string]: string;
}
