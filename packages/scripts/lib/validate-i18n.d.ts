/**
 * Computes the unused ids from code or YML file for a given locale.
 */
export declare function checkLocale(ymlFilesForLocale: string[], messageIdsFromCode: string[], ignoredIds: Set<string>, groups: Record<string, string[]>): Promise<{
    idsNotInCode: string[];
    missingIdsForLocale: string[];
}>;
/**
 * Checks that message ids gathered by the formatjs extract command are present in the specified folder(s).
 * Produces a process error if message ids are present in a language but not another,
 * or if message ids are found in i18n yml files but not in the code or vice-versa.
 * This script is shipped as part of a package so it can be used in other code bases as needed.
 */
export default function run(): Promise<void>;
//# sourceMappingURL=validate-i18n.d.ts.map