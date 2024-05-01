import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { arrow, FloatingFocusManager, offset, safePolygon, shift, useClick, useDismiss, useFloating, useHover, useInteractions, useRole } from "@floating-ui/react";
import { CaretDown } from "@styled-icons/fa-solid/CaretDown";
import { CaretUp } from "@styled-icons/fa-solid/CaretUp";
import React, { useCallback, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { css } from "styled-components";
import SubSettingsPane, { defaultMessages } from "./SubSettingsPane";
import generateModeButtonLabel from "./i18n";
var invisibleCss = css(["clip:rect(0,0,0,0);height:0;overflow:hidden;position:absolute;width:0;"]);
var InvisibleA11yLabel = styled.span.withConfig({
  displayName: "MetroModeSelector__InvisibleA11yLabel",
  componentId: "sc-n9bu6a-0"
})(["display:inline-block;", ""], invisibleCss);
var ModeBar = styled.fieldset.withConfig({
  displayName: "MetroModeSelector__ModeBar",
  componentId: "sc-n9bu6a-1"
})(["border:none;display:inline-flex;gap:0 3px;margin:0 4px 0 0;padding:0;& > legend{", "}"], invisibleCss);
var defaultAccentColor = "#666";
var defaultActiveHoverColor = "#333";
var boxShadowCss = css(["box-shadow:rgba(0,0,0,0.1) 0 0 20px;"]);
var ModeButtonWrapper = styled.span.withConfig({
  displayName: "MetroModeSelector__ModeButtonWrapper",
  componentId: "sc-n9bu6a-2"
})(["position:relative;& > label{background:#fff;border-radius:5px;border:2px solid ", ";cursor:pointer;display:inline-flex;padding:0.75rem 0.75rem;transition:all 250ms cubic-bezier(0.27,0.01,0.38,1.06);user-select:none;justify-content:center;aspect-ratio:1/1;}&:not(:last-of-type) > label{border-bottom-right-radius:0;border-top-right-radius:0;}&:not(:first-of-type) > label{border-bottom-left-radius:0;border-top-left-radius:0;}& > label:hover{background:#eee;border-color:", ";", "}& > input{", " left:-20px;position:absolute;}& > button{", " background:none;border:none;bottom:0;left:4px;position:absolute;}& > button:focus{clip:initial;height:initial;width:calc(100% - 8px);}& > input:checked + label{background:", ";}& > input:checked + label,& > input:checked ~ button{color:white;fill:", ";}& > input:focus + label{outline:5px auto blue;outline:5px auto -webkit-focus-ring-color;outline-offset:-4px;}& > input:checked + label:hover{background:", ";}& > label > svg{color:", ";display:inline-block;height:32px;margin:auto;vertical-align:middle;width:32px;fill:", ";}& > input:checked + label > svg{color:#eee;}"], function (props) {
  return props.accentColor || defaultAccentColor;
}, function (props) {
  return props.activeHoverColor || defaultActiveHoverColor;
}, boxShadowCss, invisibleCss, invisibleCss, function (props) {
  return props.accentColor || defaultAccentColor;
}, function (props) {
  return props.fillModeIcons === false ? "inherit" : "currentcolor";
}, function (props) {
  return props.activeHoverColor || defaultActiveHoverColor;
}, function (props) {
  return props.accentColor || defaultAccentColor;
}, function (props) {
  return props.fillModeIcons === false ? "inherit" : "currentcolor";
});
var HoverPanel = styled.div.withConfig({
  displayName: "MetroModeSelector__HoverPanel",
  componentId: "sc-n9bu6a-3"
})(["min-width:300px;padding:0 10px;width:75%;z-index:100;"]);
var HoverInnerContainer = styled.div.withConfig({
  displayName: "MetroModeSelector__HoverInnerContainer",
  componentId: "sc-n9bu6a-4"
})(["background:#fff;border-radius:4px;color:#2e2e2e;font-size:90%;font-weight:bold;padding:0px 20px 10px;pointer-events:none;", ""], boxShadowCss);
var Arrow = styled.div.withConfig({
  displayName: "MetroModeSelector__Arrow",
  componentId: "sc-n9bu6a-5"
})(["background:#fff;height:10px;margin-top:-5px;position:absolute;transform:rotate(-45deg);width:10px;", ""], boxShadowCss);

function ModeButton(_ref) {
  var _modeButton$modeSetti, _modeButton$enabled;

  var accentColor = _ref.accentColor,
      activeHoverColor = _ref.activeHoverColor,
      fillModeIcons = _ref.fillModeIcons,
      id = _ref.id,
      itemWithKeyboard = _ref.itemWithKeyboard,
      modeButton = _ref.modeButton,
      onPopupClose = _ref.onPopupClose,
      onPopupKeyboardExpand = _ref.onPopupKeyboardExpand,
      onSettingsUpdate = _ref.onSettingsUpdate,
      onToggle = _ref.onToggle;
  var intl = useIntl();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      hoverEnabled = _useState4[0],
      setHoverEnabled = _useState4[1];

  var arrowRef = useRef(null);
  var onOpenChange = useCallback(function (value) {
    setOpen(value);

    if (!value && typeof onPopupClose === "function") {
      onPopupClose();
    }
  }, [onPopupClose, setOpen]);

  var _useFloating = useFloating({
    middleware: [offset(8), shift(), arrow({
      element: arrowRef
    })],
    onOpenChange: onOpenChange,
    open: open
  }),
      context = _useFloating.context,
      floating = _useFloating.floating,
      _useFloating$middlewa = _useFloating.middlewareData.arrow;

  _useFloating$middlewa = _useFloating$middlewa === void 0 ? {} : _useFloating$middlewa;
  var arrowX = _useFloating$middlewa.x,
      arrowY = _useFloating$middlewa.y,
      reference = _useFloating.reference,
      strategy = _useFloating.strategy,
      x = _useFloating.x,
      y = _useFloating.y;

  var _useInteractions = useInteractions([useHover(context, {
    // Enable hover only if no popup has been triggered via keyboard.
    // (This is to avoid focus being stolen by hovering out of another button.)
    enabled: itemWithKeyboard === null && hoverEnabled,
    handleClose: safePolygon({
      blockPointerEvents: false,
      restMs: 500,
      buffer: 0
    })
  }), useClick(context), useRole(context), useDismiss(context)]),
      getFloatingProps = _useInteractions.getFloatingProps,
      getReferenceProps = _useInteractions.getReferenceProps;

  var renderDropdown = open && modeButton.enabled && ((_modeButton$modeSetti = modeButton.modeSettings) === null || _modeButton$modeSetti === void 0 ? void 0 : _modeButton$modeSetti.length) > 0;
  var interactionProps = getReferenceProps(); // ARIA roles are added by the `useRole` hook.
  // Remove the aria-controls, aria-expanded, and aria-haspopup props from the label, they will
  // instead be passed to the button for keyboard/screen reader users to trigger the popup.

  var ariaControls = interactionProps["aria-controls"],
      ariaExpanded = interactionProps["aria-expanded"],
      ariaHasPopup = interactionProps["aria-haspopup"],
      labelInteractionProps = _objectWithoutProperties(interactionProps, ["aria-controls", "aria-expanded", "aria-haspopup"]);

  var checkboxId = "metro-mode-selector-mode-".concat(id);
  var handleButtonClick = useCallback(function (e) {
    if (typeof onPopupKeyboardExpand === "function") {
      onPopupKeyboardExpand(id);
    }

    if (typeof interactionProps.onClick === "function") {
      interactionProps.onClick(e);
    }
  }, [id, interactionProps, onPopupKeyboardExpand]);
  var label = generateModeButtonLabel(modeButton.key, intl, modeButton.label);
  return /*#__PURE__*/React.createElement(ModeButtonWrapper, {
    accentColor: accentColor,
    activeHoverColor: activeHoverColor,
    fillModeIcons: fillModeIcons
  }, /*#__PURE__*/React.createElement("input", {
    "aria-label": label,
    checked: (_modeButton$enabled = modeButton.enabled) !== null && _modeButton$enabled !== void 0 ? _modeButton$enabled : undefined,
    id: checkboxId,
    onChange: onToggle,
    type: "checkbox"
  }), /*#__PURE__*/React.createElement("label", _extends({}, labelInteractionProps, {
    htmlFor: checkboxId // This will trigger mouse effects such as showing popup on hover of on check.
    ,
    ref: reference,
    title: label
  }), /*#__PURE__*/React.createElement(modeButton.Icon, {
    "aria-hidden": true,
    size: 32
  }), /*#__PURE__*/React.createElement(InvisibleA11yLabel, null, label)), /*#__PURE__*/React.createElement("button", _extends({}, interactionProps, {
    // Disable button if mode is not checked (but keep in DOM for screen reader awareness)
    disabled: !modeButton.enabled // Separate handler to communicate to the parent element
    // which item had a popup triggered using the keyboard.
    ,
    onClick: handleButtonClick // Required by linter settings
    ,
    type: "button"
  }), /*#__PURE__*/React.createElement("span", {
    role: "none"
  }, open ? /*#__PURE__*/React.createElement(CaretUp, {
    size: 14
  }) : /*#__PURE__*/React.createElement(CaretDown, {
    size: 14
  })), /*#__PURE__*/React.createElement(InvisibleA11yLabel, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.ModeSelector.settingsLabel"],
    description: "Label for the button to open settings for a travel mode.",
    id: "otpUi.ModeSelector.settingsLabel",
    values: {
      mode: label
    }
  }))), renderDropdown && /*#__PURE__*/React.createElement(FloatingFocusManager, {
    context: context // Restore the keyboard focus AND show focus cue on hovering out of the label
    // only if this component triggered the popup using the keyboard.
    // (Don't show focus cue if the popup was not triggered via keyboard.)
    ,
    returnFocus: itemWithKeyboard === id
  }, /*#__PURE__*/React.createElement(HoverPanel // This library relies on prop spreading
  // eslint-disable-next-line react/jsx-props-no-spreading
  , _extends({}, getFloatingProps(), {
    // Matches ID on Header element in SubSettingsPane
    "aria-labelledby": "metro-mode-selector-".concat(modeButton.key, "-button-label") // This is a workaround for a bug in Firefox.
    // https://github.com/floating-ui/floating-ui/issues/2299
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1829500
    ,
    onPointerDown: function onPointerDown() {
      setHoverEnabled(false);
      setTimeout(function () {
        return setHoverEnabled(true);
      }, 100);
    },
    ref: floating,
    style: {
      left: x !== null && x !== void 0 ? x : 0,
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0
    }
  }), /*#__PURE__*/React.createElement(Arrow, {
    ref: arrowRef,
    style: {
      top: arrowY !== null && arrowY !== void 0 ? arrowY : 0,
      left: arrowX !== null && arrowX !== void 0 ? arrowX : 0
    }
  }), /*#__PURE__*/React.createElement(HoverInnerContainer, null, /*#__PURE__*/React.createElement(SubSettingsPane, {
    modeButton: modeButton,
    onSettingUpdate: onSettingsUpdate
  })))));
}

export default function ModeSelector(_ref2) {
  var accentColor = _ref2.accentColor,
      activeHoverColor = _ref2.activeHoverColor,
      fillModeIcons = _ref2.fillModeIcons,
      label = _ref2.label,
      _ref2$modeButtons = _ref2.modeButtons,
      modeButtons = _ref2$modeButtons === void 0 ? [] : _ref2$modeButtons,
      onSettingsUpdate = _ref2.onSettingsUpdate,
      onToggleModeButton = _ref2.onToggleModeButton;

  // State that holds the id of the active mode combination popup that was triggered via keyboard.
  // It is used to enable/disable hover effects to avoid keyboard focus being stolen
  // and overlapping popups on mouse hover.
  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      itemWithKeyboard = _useState6[0],
      setItemWithKeyboard = _useState6[1];

  return /*#__PURE__*/React.createElement(ModeBar, {
    className: "metro-mode-selector"
  }, /*#__PURE__*/React.createElement("legend", null, label), modeButtons.map(function (button) {
    return /*#__PURE__*/React.createElement(ModeButton, {
      accentColor: accentColor,
      activeHoverColor: activeHoverColor,
      fillModeIcons: fillModeIcons,
      id: button.key,
      itemWithKeyboard: itemWithKeyboard,
      key: button.label,
      modeButton: button,
      onPopupClose: useCallback(function () {
        setItemWithKeyboard(null);
      }, [setItemWithKeyboard]),
      onPopupKeyboardExpand: setItemWithKeyboard,
      onSettingsUpdate: onSettingsUpdate,
      onToggle: useCallback(function () {
        onToggleModeButton(button.key, !button.enabled);
      }, [button, onToggleModeButton])
    });
  }));
}
//# sourceMappingURL=index.js.map