declare type MessageData = Record<string, Record<string, string> & {
    description: string;
}>;
/**
 * Collect all messages in a translation table.
 */
export declare function buildTranslationTable(ymlFilesByLocale: Record<string, string[]>, messagesFromCode: Record<string, {
    description?: string;
}>, groups: Record<string, string[]>): Promise<MessageData>;
/**
 * This script collects message ids gathered by the formatjs extract command in the specified files and folder(s)
 * and creates a CSV file with the id, description, and messages in the selected language(s).
 * This script is shipped as part of a package so it can be used in other code bases as needed.
 */
export default function run(): Promise<void>;
export {};
//# sourceMappingURL=collect-i18n-messages.d.ts.map