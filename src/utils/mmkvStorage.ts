import { createMMKV } from 'react-native-mmkv';

// @ts-ignore - TS language server caching block for newly installed native modules
export const storage = createMMKV();

export const reduxMMKVStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
        return Promise.resolve(true);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return Promise.resolve(value ?? null);
    },
    removeItem: (key: string) => {
        (storage as any).delete(key);
        return Promise.resolve();
    },
};
