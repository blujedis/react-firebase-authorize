declare function get<T>(key: string, def?: T): T;
declare function has(key: string): boolean;
declare function set(key: string, value: string | number | boolean | Date | Record<string, any>): void;
declare function remove(key: string): void;
declare function clear(): void;
export declare const storage: {
    get: typeof get;
    set: typeof set;
    has: typeof has;
    remove: typeof remove;
    clear: typeof clear;
};
export {};
//# sourceMappingURL=storage.d.ts.map