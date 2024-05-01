/// <reference types="react" />
declare type Props = {
    id?: string;
    keyboard?: boolean;
    parkAndRideLocations: {
        name: string;
        x: number;
        y: number;
    }[];
    setLocation: ({ location: Location, locationType: string, reverseGeocode: boolean }: {
        location: any;
        locationType: any;
        reverseGeocode: any;
    }) => void;
};
declare const ParkAndRideOverlay: (props: Props) => JSX.Element;
export default ParkAndRideOverlay;
//# sourceMappingURL=index.d.ts.map