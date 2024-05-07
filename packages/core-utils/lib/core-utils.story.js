"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteColorTester = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const route_1 = require("./route");
exports.default = {
    title: "core-utils"
};
const ColorBlock = styled_components_1.default.div `
  background: ${props => props.bg};
  color: ${props => props.fg};
  padding: 10px;
`;
const ColorBlockWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const ColorPair = ({ fg, bg }) => {
    return (react_1.default.createElement(ColorBlockWrapper, null,
        react_1.default.createElement(ColorBlock, { fg: fg, bg: bg }, "Provided color pair"),
        react_1.default.createElement(ColorBlock, { fg: (0, route_1.getMostReadableTextColor)(bg, fg), bg: bg }, "Corrected color pair")));
};
const RouteColorTester = () => {
    const [fg, setFg] = (0, react_1.useState)("#333333");
    const [bg, setBg] = (0, react_1.useState)("#cbeb55");
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ColorPair, { bg: bg, fg: fg }),
        react_1.default.createElement("label", null,
            "Foreground Color",
            react_1.default.createElement("input", { onChange: e => setFg(e.target.value), type: "color", value: fg })),
        react_1.default.createElement("label", null,
            "Background Color",
            react_1.default.createElement("input", { onChange: e => setBg(e.target.value), type: "color", value: bg }))));
};
exports.RouteColorTester = RouteColorTester;
// Disable color contrast checking for the uncorrected color pairs
exports.RouteColorTester.parameters = {
    a11y: { config: { rules: [{ id: "color-contrast", reviewOnFail: true }] } },
    storyshots: { disable: true }
};
//# sourceMappingURL=core-utils.story.js.map