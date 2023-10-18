import { DeepReadonly } from 'vue';

export function useValue<T>(callbackFn: () => T): T {
    return callbackFn();
}

function deepFreeze<T = any>(obj: T): DeepReadonly<T> {
    if (!(obj instanceof Object)) return obj as any;

    for (const key in obj) {
        const value: any = (obj as any)[key];
        deepFreeze(value);
    }

    return Object.freeze(obj) as any;
}

export { deepFreeze };
