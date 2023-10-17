export {};

declare global {
    interface IndexSignature<T = any> {
        [key: string]: T;
    }
}
