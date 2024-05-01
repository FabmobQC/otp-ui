/// <reference types="react" />
/**
 * A component which shows a "street view" button if a Mapillary image is available for a
 * passed coordinate
 *
 * @param coords        The coordinates to find imagery for in the format [lat, lon]
 * @param mapillaryKey  A Mapillary api key used to check for imagery.
 * @param clickCallback A method to fire when the button is clicked, which accepts an ID.
 *  If it is not passed, a popup window will be opened. */
declare const MapillaryButton: ({ clickCallback, coords, mapillaryKey }: {
    clickCallback?: (id: string) => void;
    coords: {
        lat: number;
        lon: number;
    };
    mapillaryKey: string;
}) => JSX.Element;
export default MapillaryButton;
//# sourceMappingURL=mapillary-button.d.ts.map