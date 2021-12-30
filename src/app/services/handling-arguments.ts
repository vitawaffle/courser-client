export interface HandlingArguments {
    onSuccess?: () => void,
    onFinal?: () => void,
    onError?: (error?: any) => void,
    onUnauthorized?: () => void,
}
