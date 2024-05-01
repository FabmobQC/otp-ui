"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collect_i18n_messages_1 = require("../collect-i18n-messages");
const util_1 = require("./util");
describe("collect-i18n-messages", () => {
    describe("buildTranslationTable", () => {
        it("should build a translation table", async () => {
            const groups = {
                "otpUi.OtherComponent.*Message": ["key1", "key2", "extraKey"]
            };
            const ymlFiles = {
                "en-US": [`${util_1.mocksFolderFromCwd}/i18n1/en-US.yml`],
                fr: [`${util_1.mocksFolderFromCwd}/i18n1/fr.yml`]
            };
            const messagesFromCode = {
                "otpUi.FromToLocationPicker.from": {},
                "otpUi.FromToLocationPicker.planATrip": {
                    description: "Prompt for planning a trip"
                },
                "otpUi.FromToLocationPicker.to": {},
                // Extra ones not in the language files for detecting untranslated ids.
                "otpUi.ExtraId.fromCode": {},
                "otpUi.ExtraId.fromCodeThatIsIgnored": {}
            };
            const translationTable = await (0, collect_i18n_messages_1.buildTranslationTable)(ymlFiles, messagesFromCode, groups);
            expect(Object.keys(translationTable).length).toBe(8);
            expect(Object.keys(messagesFromCode).every(id => !!translationTable[id])).toBe(true);
            // Basic message from code and in translation files.
            const planTripMessage = translationTable["otpUi.FromToLocationPicker.planATrip"];
            expect(planTripMessage.description).toBe("Prompt for planning a trip");
            expect(planTripMessage["en-US"]).toBe("Plan a trip:");
            expect(planTripMessage.fr).toBe("Planifier un trajet :");
            // Message declared in groups should be reported too, even if not in translation files.
            const groupMessage = translationTable["otpUi.OtherComponent.key1Message"];
            expect(groupMessage.description).toBe(undefined);
            expect(groupMessage["en-US"]).toBe("Key 1");
            expect(groupMessage.fr).toBe(undefined);
            const unusedGroupMessage = translationTable["otpUi.OtherComponent.extraKeyMessage"];
            expect(unusedGroupMessage.description).toBe(undefined);
            expect(unusedGroupMessage["en-US"]).toBe(undefined);
            expect(unusedGroupMessage.fr).toBe(undefined);
        });
    });
});
//# sourceMappingURL=collect-i18n-messages.js.map