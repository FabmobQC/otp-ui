/// <reference types="react" />
declare type Props = {
    path?: {
        color?: string;
        opacity?: number;
        weight?: number;
    };
    tripData: {
        geometry: {
            points: string;
            length: number;
        };
    };
    visible?: boolean;
};
declare const TripViewerOverlay: (props: Props) => JSX.Element;
export default TripViewerOverlay;
//# sourceMappingURL=index.d.ts.map