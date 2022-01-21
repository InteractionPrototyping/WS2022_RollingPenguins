export class GlobalConstants {
    // Saves the events counter and its visibility for the navigation bar globally because it's accessed from different components
    public static savedEventsCounter: number = 0;
    public static visibilitySavedEventsCounter: boolean = true;
    // Lazy implementation for setting the GoogleMaps-Navigation link in the event detail page component and sharing it with the "Angular Dialog"
    public static navigationLink: string;
}