export function useValue<T>(callbackFn: () => T): T {
    return callbackFn();
}
