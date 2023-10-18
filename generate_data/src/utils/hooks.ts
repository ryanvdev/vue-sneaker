import { format } from 'prettier';

export function useValue<T>(callbackFn: () => T): T {
    return callbackFn();
}

export function useJsonFormat(v: string): Promise<string> {
    return format(v, {
        parser: 'json',
        tabWidth: 4,
        printWidth: 120,
        endOfLine: 'crlf',
    });
}
