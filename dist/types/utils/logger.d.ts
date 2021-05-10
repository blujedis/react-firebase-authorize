import type { IAuthLogPayload } from '../types';
export declare type Logger = ReturnType<typeof initLogger>;
declare function initLogger(logger: (payload: IAuthLogPayload) => void): {
    (message: string): void;
    <E extends Error>(error: E): void;
    (data: Record<string, any>): void;
    (type: IAuthLogPayload['level'], message: string): void;
    <E_1 extends Error>(type: IAuthLogPayload['level'], error: E_1): void;
    (type: IAuthLogPayload['level'], data: Record<string, any>): void;
};
export declare function createLogger(logger: (payload: IAuthLogPayload) => void): {
    (message: string): void;
    <E extends Error>(error: E): void;
    (data: Record<string, any>): void;
    (type: "log" | "fatal" | "error" | "warn" | "info" | "debug", message: string): void;
    <E_1 extends Error>(type: "log" | "fatal" | "error" | "warn" | "info" | "debug", error: E_1): void;
    (type: "log" | "fatal" | "error" | "warn" | "info" | "debug", data: Record<string, any>): void;
};
export {};
//# sourceMappingURL=logger.d.ts.map