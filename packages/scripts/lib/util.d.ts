export interface SourceFilesAndYmlFilesByLocale {
    exceptionFiles: string[];
    sourceFiles: string[];
    ymlFilesByLocale: Record<string, string[]>;
}
export declare function shouldProcessFile(fileName: string, folder: string): boolean;
/**
 * @returns true if the id is not special or reserved (i.e. doesn't start with "_").
 */
export declare function isNotSpecialId(id: string): boolean;
/**
 * Helper function that sorts yml, source, and exception files into different buckets.
 * @param argv The value from process.argv.
 * @returns A composite object with a list for yml files by locale, and a list for source files.
 */
export declare function sortSourceAndYmlFiles(argv: string[]): Promise<SourceFilesAndYmlFilesByLocale>;
/**
 * Load yaml from a file into a js object
 */
export declare function loadYamlFile(filename: string): Promise<any>;
/**
 * Convert a groups object into a list of corresponding message ids.
 */
export declare function expandGroupIds(groups: Record<string, string[]>): string[];
interface CheckException {
    groups: Record<string, string[]>;
    ignoredIds: Set<string>;
}
/**
 * Combines exception files into a single exception object.
 */
export declare function combineExceptionFiles(exceptionFiles: string[]): Promise<CheckException>;
export {};
//# sourceMappingURL=util.d.ts.map