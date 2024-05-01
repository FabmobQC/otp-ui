"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModeSelector;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = require("@floating-ui/react");

var _CaretDown = require("@styled-icons/fa-solid/CaretDown");

var _CaretUp = require("@styled-icons/fa-solid/CaretUp");

var _react2 = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _SubSettingsPane = _interopRequireWildcard(require("./SubSettingsPane"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const invisibleCss = (0, _styledComponents.css)(["clip:rect(0,0,0,0);height:0;overflow:hidden;position:absolute;width:0;"]);

const InvisibleA11yLabel = _styledComponents.default.span.withConfig({
  displayName: "MetroModeSelector__InvisibleA11yLabel",
  componentId: "sc-n9bu6a-0"
})(["display:inline-block;", ""], invisibleCss);

const ModeBar = _styledComponents.default.fieldset.withConfig({
  displayName: "MetroModeSelector__ModeBar",
  componentId: "sc-n9bu6a-1"
})(["border:none;display:inline-flex;gap:0 3px;margin:0 4px 0 0;padding:0;& > legend{", "}"], invisibleCss);

const defaultAccentColor = "#666";
const defaultActiveHoverColor = "#333";
const boxShadowCss = (0, _styledComponents.css)(["box-shadow:rgba(0,0,0,0.1) 0 0 20px;"]);

const ModeButtonWrapper = _styledComponents.default.span.withConfig({
  displayName: "MetroModeSelector__ModeButtonWrapper",
  componentId: "sc-n9bu6a-2"
})(["position:relative;& > label{background:#fff;border-radius:5px;border:2px solid ", ";cursor:pointer;display:inline-flex;padding:0.75rem 0.75rem;transition:all 250ms cubic-bezier(0.27,0.01,0.38,1.06);user-select:none;justify-content:center;aspect-ratio:1/1;}&:not(:last-of-type) > label{border-bottom-right-radius:0;border-top-right-radius:0;}&:not(:first-of-type) > label{border-bottom-left-radius:0;border-top-left-radius:0;}& > label:hover{background:#eee;border-color:", ";", "}& > input{", " left:-20px;position:absolute;}& > button{", " background:none;border:none;bottom:0;left:4px;position:absolute;}& > button:focus{clip:initial;height:initial;width:calc(100% - 8px);}& > input:checked + label{background:", ";}& > input:checked + label,& > input:checked ~ button{color:white;fill:", ";}& > input:focus + label{outline:5px auto blue;outline:5px auto -webkit-focus-ring-color;outline-offset:-4px;}& > input:checked + label:hover{background:", ";}& > label > svg{color:", ";display:inline-block;height:32px;margin:auto;vertical-align:middle;width:32px;fill:", ";}& > input:checked + label > svg{color:#eee;}"], props => props.accentColor || defaultAccentColor, props => props.activeHoverColor || defaultActiveHoverColor, boxShadowCss, invisibleCss, invisibleCss, props => props.accentColor || defaultAccentColor, props => props.fillModeIcons === false ? "inherit" : "currentcolor", props => props.activeHoverColor || defaultActiveHoverColor, props => props.accentColor || defaultAccentColor, props => props.fillModeIcons === false ? "inherit" : "currentcolor");

const HoverPanel = _styledComponents.default.div.withConfig({
  displayName: "MetroModeSelector__HoverPanel",
  componentId: "sc-n9bu6a-3"
})(["min-width:300px;padding:0 10px;width:75%;z-index:100;"]);

const HoverInnerContainer = _styledComponents.default.div.withConfig({
  displayName: "MetroModeSelector__HoverInnerContainer",
  componentId: "sc-n9bu6a-4"
})(["background:#fff;border-radius:4px;color:#2e2e2e;font-size:90%;font-weight:bold;padding:0px 20px 10px;pointer-events:none;", ""], boxShadowCss);

const Arrow = _styledComponents.default.div.withConfig({
  displayName: "MetroModeSelector__Arrow",
  componentId: "sc-n9bu6a-5"
})(["background:#fff;height:10px;margin-top:-5px;position:absolute;transform:rotate(-45deg);width:10px;", ""], boxShadowCss);

function ModeButton({
  accentColor,
  activeHoverColor,
  fillModeIcons,
  id,
  itemWithKeyboard,
  modeButton,
  onPopupClose,
  onPopupKeyboardExpand,
  onSettingsUpdate,
  onToggle
}) {
  var _modeButton$modeSetti, _modeButton$enabled;

  const intl = (0, _reactIntl.useIntl)();
  const [open, setOpen] = (0, _react2.useState)(false);
  const [hoverEnabled, setHoverEnabled] = (0, _react2.useState)(true);
  const arrowRef = (0, _react2.useRef)(null);
  const onOpenChange = (0, _react2.useCallback)(value => {
    setOpen(value);

    if (!value && typeof onPopupClose === "function") {
      onPopupClose();
    }
  }, [onPopupClose, setOpen]);
  const {
    context,
    floating,
    middlewareData: {
      arrow: {
        x: arrowX,
        y: arrowY
      } = {}
    },
    reference,
    strategy,
    x,
    y
  } = (0, _react.useFloating)({
    middleware: [(0, _react.offset)(8), (0, _react.shift)(), (0, _react.arrow)({
      element: arrowRef
    })],
    onOpenChange,
    open
  });
  const {
    getFloatingProps,
    getReferenceProps
  } = (0, _react.useInteractions)([(0, _react.useHover)(context, {
    // Enable hover only if no popup has been triggered via keyboard.
    // (This is to avoid focus being stolen by hovering out of another button.)
    enabled: itemWithKeyboard === null && hoverEnabled,
    handleClose: (0, _react.safePolygon)({
      blockPointerEvents: false,
      restMs: 500,
      buffer: 0
    })
  }), (0, _react.useClick)(context), (0, _react.useRole)(context), (0, _react.useDismiss)(context)]);
  const renderDropdown = open && modeButton.enabled && ((_modeButton$modeSetti = modeButton.modeSettings) === null || _modeButton$modeSetti === void 0 ? void 0 : _modeButton$modeSetti.length) > 0;
  const interactionProps = getReferenceProps(); // ARIA roles are added by the `useRole` hook.
  // Remove the aria-controls, aria-expanded, and aria-haspopup props from the label, they will
  // instead be passed to the button for keyboard/screen reader users to trigger the popup.

  const {
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    ...labelInteractionProps
  } = interactionProps;
  const checkboxId = `metro-mode-selector-mode-${id}`;
  const handleButtonClick = (0, _react2.useCallback)(e => {
    if (typeof onPopupKeyboardExpand === "function") {
      onPopupKeyboardExpand(id);
    }

    if (typeof interactionProps.onClick === "function") {
      interactionProps.onClick(e);
    }
  }, [id, interactionProps, onPopupKeyboardExpand]);
  const label = (0, _i18n.default)(modeButton.key, intl, modeButton.label);
  return /*#__PURE__*/_react2.default.createElement(ModeButtonWrapper, {
    accentColor: accentColor,
    activeHoverColor: activeHoverColor,
    fillModeIcons: fillModeIcons
  }, /*#__PURE__*/_react2.default.createElement("input", {
    "aria-label": label,
    checked: (_modeButton$enabled = modeButton.enabled) !== null && _modeButton$enabled !== void 0 ? _modeButton$enabled : undefined,
    id: checkboxId,
    onChange: onToggle,
    type: "checkbox"
  }), /*#__PURE__*/_react2.default.createElement("label", (0, _extends2.default)({}, labelInteractionProps, {
    htmlFor: checkboxId // This will trigger mouse effects such as showing popup on hover of on check.
    ,
    ref: reference,
    title: label
  }), /*#__PURE__*/_react2.default.createElement(modeButton.Icon, {
    "aria-hidden": true,
    size: 32
  }), /*#__PURE__*/_react2.default.createElement(InvisibleA11yLabel, null, label)), /*#__PURE__*/_react2.default.createElement("button", (0, _extends2.default)({}, interactionProps, {
    // Disable button if mode is not checked (but keep in DOM for screen reader awareness)
    disabled: !modeButton.enabled // Separate handler to communicate to the parent element
    // which item had a popup triggered using the keyboard.
    ,
    onClick: handleButtonClick // Required by linter settings
    ,
    type: "button"
  }), /*#__PURE__*/_react2.default.createElement("span", {
    role: "none"
  }, open ? /*#__PURE__*/_react2.default.createElement(_CaretUp.CaretUp, {
    size: 14
  }) : /*#__PURE__*/_react2.default.createElement(_CaretDown.CaretDown, {
    size: 14
  })), /*#__PURE__*/_react2.default.createElement(InvisibleA11yLabel, null, /*#__PURE__*/_react2.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _SubSettingsPane.defaultMessages["otpUi.ModeSelector.settingsLabel"],
    description: "Label for the button to open settings for a travel mode.",
    id: "otpUi.ModeSelector.settingsLabel",
    values: {
      mode: label
    }
  }))), renderDropdown && /*#__PURE__*/_react2.default.createElement(_react.FloatingFocusManager, {
    context: context // Restore the keyboard focus AND show focus cue on hovering out of the label
    // only if this component triggered the popup using the keyboard.
    // (Don't show focus cue if the popup was not triggered via keyboard.)
    ,
    returnFocus: itemWithKeyboard === id
  }, /*#__PURE__*/_react2.default.createElement(HoverPanel // This library relies on prop spreading
  // eslint-disable-next-line react/jsx-props-no-spreading
  , (0, _extends2.default)({}, getFloatingProps(), {
    // Matches ID on Header element in SubSettingsPane
    "aria-labelledby": `metro-mode-selector-${modeButton.key}-button-label` // This is a workaround for a bug in Firefox.
    // https://github.com/floating-ui/floating-ui/issues/2299
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1829500
    ,
    onPointerDown: () => {
      setHoverEnabled(false);
      setTimeout(() => setHoverEnabled(true), 100);
    },
    ref: floating,
    style: {
      left: x !== null && x !== void 0 ? x : 0,
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0
    }
  }), /*#__PURE__*/_react2.default.createElement(Arrow, {
    ref: arrowRef,
    style: {
      top: arrowY !== null && arrowY !== void 0 ? arrowY : 0,
      left: arrowX !== null && arrowX !== void 0 ? arrowX : 0
    }
  }), /*#__PURE__*/_react2.default.createElement(HoverInnerContainer, null, /*#__PURE__*/_react2.default.createElement(_SubSettingsPane.default, {
    modeButton: modeButton,
    onSettingUpdate: onSettingsUpdate
  })))));
}

function ModeSelector({
  accentColor,
  activeHoverColor,
  fillModeIcons,
  label,
  modeButtons = [],
  onSettingsUpdate,
  onToggleModeButton
}) {
  // State that holds the id of the active mode combination popup that was triggered via keyboard.
  // It is used to enable/disable hover effects to avoid keyboard focus being stolen
  // and overlapping popups on mouse hover.
  const [itemWithKeyboard, setItemWithKeyboard] = (0, _react2.useState)(null);
  return /*#__PURE__*/_react2.default.createElement(ModeBar, {
    className: "metro-mode-selector"
  }, /*#__PURE__*/_react2.default.createElement("legend", null, label), modeButtons.map(button => /*#__PURE__*/_react2.default.createElement(ModeButton, {
    accentColor: accentColor,
    activeHoverColor: activeHoverColor,
    fillModeIcons: fillModeIcons,
    id: button.key,
    itemWithKeyboard: itemWithKeyboard,
    key: button.label,
    modeButton: button,
    onPopupClose: (0, _react2.useCallback)(() => {
      setItemWithKeyboard(null);
    }, [setItemWithKeyboard]),
    onPopupKeyboardExpand: setItemWithKeyboard,
    onSettingsUpdate: onSettingsUpdate,
    onToggle: (0, _react2.useCallback)(() => {
      onToggleModeButton(button.key, !button.enabled);
    }, [button, onToggleModeButton])
  })));
}
//# sourceMappingURL=index.js.map