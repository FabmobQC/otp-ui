import coreUtils from "@opentripplanner/core-utils";
import React, { useRef, useEffect } from "react";
import { categoryIsActive, getCategoryPrimaryMode, getSelectedModes, isServerEnv } from "./util";
import * as S from "./styled";
import Checkbox from "./Checkbox";

var ModeRow = function ModeRow(_ref) {
  var checkboxIcons = _ref.checkboxIcons,
      onQueryParamChange = _ref.onQueryParamChange,
      queryParamOverrides = _ref.queryParamOverrides,
      queryParams = _ref.queryParams,
      SimpleModeIcon = _ref.SimpleModeIcon,
      supportedModes = _ref.supportedModes;
  var categories = supportedModes.categories;
  var selectedModes = getSelectedModes(queryParams);
  var selectedTransit = selectedModes.filter(coreUtils.itinerary.isTransit);
  var hasTransit = selectedTransit.length > 0;
  var selectedTransitString = selectedTransit.join(",") || "TRANSIT";

  var setModeToTransit = function setModeToTransit() {
    return onQueryParamChange({
      companies: "",
      mode: "".concat(selectedTransitString, ",WALK")
    });
  }; // Scroll to active mode on initial render
  // This ref is attached to every active mode checkbox


  var initialRenderRef = useRef();
  useEffect(function () {
    // Non-DOM environments don't support scrollIntoView
    // Also disable for modes that have transit to prevent confusing
    // and unnecessary scrolling
    if (!isServerEnv && !hasTransit) {
      var _initialRenderRef$cur;

      initialRenderRef === null || initialRenderRef === void 0 ? void 0 : (_initialRenderRef$cur = initialRenderRef.current) === null || _initialRenderRef$cur === void 0 ? void 0 : _initialRenderRef$cur.scrollIntoView({
        behavior: "auto",
        // Ideally there is no vertical scrolling, but if this likely non-effective
        // scrolling is acceptable, then it is simpler
        block: "end",
        inline: "center"
      });
    }
  }, []);
  return (
    /*#__PURE__*/

    /* Not hiding the scrollbars here ensures the user can still scroll. Scrollbars are hidden using CSS. */
    React.createElement(S.ScrollableRow, {
      hideScrollbars: false
    }, /*#__PURE__*/React.createElement(Checkbox, {
      ariaLabel: "Go by Transit",
      checkboxIcons: checkboxIcons,
      checked: hasTransit // Prettier conflicts with jsx style rules
      // eslint-disable-next-line prettier/prettier
      ,
      onClick: setModeToTransit,
      selected: hasTransit,
      SimpleModeIcon: SimpleModeIcon
    }, "Go by Transit"), categories.map(function (category) {
      var selectedModeAndCategoryActive = categoryIsActive(category, selectedModes);
      var isChecked = hasTransit ? category.type === "access" && selectedModeAndCategoryActive : category.type === "exclusive" && selectedModeAndCategoryActive;

      var onChangeMode = function onChangeMode() {
        var _category$options, _category$options2, _category$options2$;

        // If clicking on a mode that's active, reset to transit only
        if (isChecked) {
          setModeToTransit();
          return;
        } // Use override query if present


        if (queryParamOverrides && queryParamOverrides[category.id]) {
          var _override$mode2;

          var override = queryParamOverrides[category.id]; // Ensure exclusive modes that share IDs with non-exclusive modes don't have transit

          if (category.type === "exclusive") {
            var _override$mode;

            override.mode = (_override$mode = override.mode) === null || _override$mode === void 0 ? void 0 : _override$mode.replace("TRANSIT,", "");
          } // Ensure access modes that share IDs with exclusive modes include transit


          if (category.type !== "exclusive" && !((_override$mode2 = override.mode) !== null && _override$mode2 !== void 0 && _override$mode2.includes("TRANSIT"))) {
            override.mode = "TRANSIT,".concat(override.mode);
          }

          onQueryParamChange(override, category.id);
          return;
        }

        var mode = getCategoryPrimaryMode(category); // If the category has a single mode select companies from all
        // options, if the category has mixed modes select the company
        // (if any) associated with first option

        var companies = (category.mode ? (_category$options = category.options) === null || _category$options === void 0 ? void 0 : _category$options.map(function (o) {
          return o.company;
        }).join(",") : (_category$options2 = category.options) === null || _category$options2 === void 0 ? void 0 : (_category$options2$ = _category$options2[0]) === null || _category$options2$ === void 0 ? void 0 : _category$options2$.company) || "";

        if (category.type === "access") {
          mode = isChecked ? selectedTransitString : "".concat(selectedTransitString, ",").concat(mode);
        }

        onQueryParamChange({
          companies: companies,
          mode: mode
        }, category.id);
      }; // All Tri-Met categories either have a mode or the first option does


      var mode = category.mode || category.options && category.options[0].mode;
      return /*#__PURE__*/React.createElement(Checkbox, {
        ariaLabel: category.label,
        checkboxIcons: checkboxIcons,
        checked: isChecked,
        key: "access-".concat(category.label),
        mode: mode,
        onClick: onChangeMode,
        innerRef: isChecked ? initialRenderRef : null,
        selected: isChecked,
        SimpleModeIcon: SimpleModeIcon
      }, category.label);
    }))
  );
};

export default ModeRow;
//# sourceMappingURL=ModeRow.js.map