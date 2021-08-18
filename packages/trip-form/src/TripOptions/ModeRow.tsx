import coreUtils from "@opentripplanner/core-utils";
import React from "react";

import { Modes, QueryParams } from "./types";
import * as S from "./styled";
import {
  categoryIsActive,
  getCategoryPrimaryMode,
  getSelectedModes
} from "./util";

import trimetModeIcon from "../../../icons/src/trimet-mode-icon-2021";

const ModeRow = ({
  onQueryParamChange,
  queryParams,
  supportedModes
}: {
  onQueryParamChange(paramsToUpdate: QueryParams): void;
  queryParams: QueryParams;
  supportedModes: Modes;
}) => {
  const { categories } = supportedModes;
  const selectedModes = getSelectedModes(queryParams);
  const selectedTransit = selectedModes.filter(coreUtils.itinerary.isTransit);
  const hasTransit = selectedTransit.length > 0;
  return (
    // errors appear on the next line becuase in a testing environment,
    // this component is converted to a div which does not support
    // the hideScrollbars prop
    <S.ScrollableRow hideScrollbars={false}>
      <S.Checkbox
        onClick={() => onQueryParamChange({ mode: "TRANSIT" })}
        selected={hasTransit}
      >
        {hasTransit ? <S.GreenCheck /> : <S.UncheckedIcon />}
        Go by Transit
      </S.Checkbox>
      {categories.map(category => {
        const isChecked = hasTransit
          ? category.type === "access" &&
            categoryIsActive(category, selectedModes)
          : category.type === "exclusive" &&
            categoryIsActive(category, selectedModes);
        const onChangeMode = () => {
          let mode = getCategoryPrimaryMode(category);
          const company =
            typeof category.mode === "undefined"
              ? undefined
              : category.options?.map(o => o.company).join(",");
          const selectedTransitString = selectedTransit.join(",") || "TRANSIT";
          if (category.type === "access") {
            mode = isChecked
              ? selectedTransitString
              : `${selectedTransitString},${mode}`;
          }
          onQueryParamChange({ company, mode });
        };
        // All Tri-Met categories either have a mode or the first option does
        const mode =
          category.mode || (category.options && category.options[0].mode);
        return (
          <S.Checkbox
            key={`access-${category.label}`}
            onClick={onChangeMode}
            selected={isChecked}
          >
            <span className="custom">{trimetModeIcon({ mode })}</span>

            {isChecked ? <S.GreenCheck /> : <S.UncheckedIcon />}
            {category.label}
          </S.Checkbox>
        );
      })}
    </S.ScrollableRow>
  );
};

export default ModeRow;
