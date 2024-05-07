"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Red = exports.Blue = exports.Grey = void 0;
const react_1 = __importDefault(require("react"));
const ColorPalette_1 = __importDefault(require("./ColorPalette"));
const grey_1 = __importDefault(require("../colors/grey"));
const blue_1 = __importDefault(require("../colors/blue"));
const red_1 = __importDefault(require("../colors/red"));
exports.default = {
    title: "Building-Blocks/Colors"
};
const Grey = () => {
    return react_1.default.createElement(ColorPalette_1.default, { color: grey_1.default });
};
exports.Grey = Grey;
const Blue = () => {
    return react_1.default.createElement(ColorPalette_1.default, { color: blue_1.default });
};
exports.Blue = Blue;
const Red = () => {
    return react_1.default.createElement(ColorPalette_1.default, { color: red_1.default });
};
exports.Red = Red;
//# sourceMappingURL=index.story.js.map