/**
 * Store a javascript object at the specified key.
 */
export declare function storeItem(key: string, object: unknown): void;
/**
 * Retrieve a javascript object at the specified key. If not found, defaults to
 * null or, the optionally provided notFoundValue.
 */
export declare function getItem(key: string, notFoundValue?: unknown): unknown;
/**
 * Remove item at specified key.
 */
export declare function removeItem(key: string): void;
/**
 * Generate a random ID. This might not quite be a UUID, but it serves our
 * purposes for now.
 */
export declare function randId(): string;
//# sourceMappingURL=storage.d.ts.map