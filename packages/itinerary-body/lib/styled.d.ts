import { ReactElement } from "react";
interface LightBorderDivProps {
    hideBorder: string;
    theme?: {
        borderColor?: string;
    };
}
/**
 * This component is needed to give the offset border look to stacked place rows
 * Since the value we have access to is "interlineWithPreviousLeg" then we
 * have to show/hide the top border of the div and apply a small offset
 */
export declare const LightBorderDiv: import("styled-components").StyledComponent<"div", any, LightBorderDivProps, never>;
export declare const TransparentButton: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const AnchorButton: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const LinkButton: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const ViewerButton: import("styled-components").StyledComponent<"a", any, {}, never>;
interface ModeRouteProps {
    mode: string;
    routeColor: string;
}
export declare const AccessBadge: import("styled-components").StyledComponent<"div", any, ModeRouteProps, never>;
export declare const ArrivalTimeContainer: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const CallAheadWarning: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const BookLaterContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const BookLaterInnerContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const BookLaterPointer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const BookLaterText: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const BookTNCRideButton: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const BookTNCRideButtonContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TNCTravelTime: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TNCCost: import("styled-components").StyledComponent<"div", any, {}, never>;
interface CaretToggleProps {
    className?: string;
    expanded: boolean;
}
export declare const CaretToggleBase: ({ className, expanded }: CaretToggleProps) => ReactElement;
export declare const CaretToggle: import("styled-components").StyledComponent<({ className, expanded }: CaretToggleProps) => ReactElement, any, {}, never>;
export declare const Destination: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const InnerLine: import("styled-components").StyledComponent<"div", any, ModeRouteProps, never>;
export declare const InterlineDot: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const InterlineName: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const IntermediateStops: import("styled-components").StyledComponent<"ol", any, {}, never>;
export declare const ItineraryBody: import("styled-components").StyledComponent<"ol", any, {}, never>;
export declare const LegBody: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LegClickable: import("styled-components").StyledComponent<"div", any, {}, never>;
/**
 * Transparent button, clickable by all, with an invisible text about zooming to a leg on the map.
 * The button sits on top of LegDescription, so that the button's text visually appears to be
 * that of LegDescription.
 */
export declare const LegClickableButton: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const LegDescription: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const InvisibleAdditionalDetails: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegDescriptionHeadsignPrefix: import("styled-components").StyledComponent<"span", any, {}, never>;
/**
 * Lets others apply styles to the mode text in
 * "Bicycle 0.5 miles to City Hall"
 */
export declare const LegDescriptionMode: import("styled-components").StyledComponent<"span", any, {}, never>;
/**
 * Lets others apply styles to the place text in
 * "Bicycle 0.5 miles to City Hall"
 */
export declare const LegDescriptionPlace: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegDescriptionRouteLongName: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegDescriptionRouteShortName: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegDescriptionForTransit: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegIconContainer: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegIconAndRouteShortName: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const LegLine: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LineBadgeContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LineColumn: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LegDetails: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const PlaceRowWrapper: import("styled-components").StyledComponent<"li", any, {}, never>;
interface PreviewContainerProps {
    active: boolean;
}
export declare const PreviewContainer: import("styled-components").StyledComponent<"div", any, PreviewContainerProps, never>;
export declare const TimeColumn: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const MapButton: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const MapButtonColumn: import("styled-components").StyledComponent<"div", any, LightBorderDivProps, never>;
export declare const MapIcon: import("styled-components").StyledComponent<any, any, object & {
    fill: any;
    width: number;
    height: number;
    role: string;
}, string | number | symbol>;
export declare const PlaceDetails: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PlaceHeader: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PlaceName: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const PlaceSubheader: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PreviewDiagram: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const PreviewDiagramElevationChange: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const PreviewDiagramElevationGain: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const PreviewDiagramElevationLoss: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const PreviewDiagramTitle: import("styled-components").StyledComponent<"div", any, {}, never>;
interface RouteBadgeProps {
    routeColor: string;
    theme?: {
        badgeBorderColor?: string;
        mainColor?: string;
    };
}
export declare const RouteBadge: import("styled-components").StyledComponent<"div", any, RouteBadgeProps, never>;
export declare const SROnly: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const SRHidden: import("styled-components").StyledComponent<"span", any, {
    "aria-hidden": true;
}, "aria-hidden">;
export declare const Steps: import("styled-components").StyledComponent<"ol", any, {}, never>;
export declare const StepDescriptionContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const StepsHeaderAndMapLink: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const StepsHeaderButton: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const StepsHeaderSpan: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const StepIconContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const StepRow: import("styled-components").StyledComponent<"li", any, {}, never>;
export declare const StepStreetName: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const StepLength: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const StopIdSpan: import("styled-components").StyledComponent<"span", any, {}, never>;
export declare const StopMarker: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const StopName: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const StopRow: import("styled-components").StyledComponent<"li", any, {}, never>;
export declare const TransitAlert: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const TransitAlertBody: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitAlertEffectiveDate: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitAlertHeader: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitAlertIconContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitAlerts: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitAlertToggle: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const TransitLegDetails: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitLegDetailsHeader: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitLegExpandedBody: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitLegFare: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TransitLegSummary: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const DefaultAlertToggleIcon: import("styled-components").StyledComponent<import("@styled-icons/styled-icon").StyledIcon, any, {
    size: 15;
}, "size">;
export declare const DefaultAlertBodyIcon: import("styled-components").StyledComponent<import("@styled-icons/styled-icon").StyledIcon, any, {
    size: 18;
}, "size">;
export declare const AgencyInfo: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
//# sourceMappingURL=styled.d.ts.map