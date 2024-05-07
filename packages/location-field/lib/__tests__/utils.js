"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var places = [
    {
        displayName: "Work (123 Main Street)"
    },
    {
        displayName: "Home (123 Quiet Street)"
    },
    {
        displayName: "Coffee Shop (Best Coffee, 456 River Street)"
    }
];
describe("location-field > options", function () {
    describe("getMatchingLocations", function () {
        it("matches a location when passing substrings of its name or address", function () {
            var testCases = [
                {
                    expected: places[0],
                    strings: ["Wor", "ORK", "main"]
                },
                {
                    expected: places[1],
                    strings: ["Hom", "OM", "quiet"]
                },
                {
                    expected: places[2],
                    strings: ["fee", "456", "BEST"]
                }
            ];
            testCases.forEach(function (_a) {
                var expected = _a.expected, strings = _a.strings;
                strings.forEach(function (text) {
                    var match = (0, utils_1.getMatchingLocations)(places, text);
                    expect(match.length).toBe(1);
                    expect(match[0]).toBe(expected);
                });
            });
        });
        it("matches two locations if they have the typed content", function () {
            var match = (0, utils_1.getMatchingLocations)(places, "123");
            expect(match.length).toBe(2);
            expect(match.includes(places[0])).toBe(true);
            expect(match.includes(places[1])).toBe(true);
        });
        it("matches no location when passing irrelevant text", function () {
            var match = (0, utils_1.getMatchingLocations)(places, "stuff");
            expect(match.length).toBe(0);
        });
    });
});
//# sourceMappingURL=utils.js.map