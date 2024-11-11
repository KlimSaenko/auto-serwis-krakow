import { Loader } from '@googlemaps/js-api-loader';

class GoogleServices {
    private static loader: Loader;
    private static googleMapsApiUrl = (placeId: string, apiKey: string, locale: string) => `https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&key=${apiKey}&language=${locale}&zoom=14`;
    private static googlePlacesApiUrl = (placeId: string, apiKey: string, locale: string) => `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,reviews&key=${apiKey}&languageCode=${locale}`;
    private placesLib: Promise<google.maps.PlacesLibrary>;

    // private place: Promise<google.maps.places.PlaceResult | null>;
    private placeId: string;
    private apiKey: string;

    get Loader() {
        return GoogleServices.loader;
    };

    GoogleMapsApiUrl(locale: string): string {
        return GoogleServices.googleMapsApiUrl(this.placeId, this.apiKey, locale);
    };

    GooglePlacesApiUrl(locale: string): string {
        return GoogleServices.googlePlacesApiUrl(this.placeId, this.apiKey, locale);
    };

    static GoogleMapsApiUrl(locale: string,
                            placeId: string = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID,
                            apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY): string {
        return GoogleServices.googleMapsApiUrl(placeId, apiKey, locale);
    };

    static GooglePlacesApiUrl(locale: string,
                            placeId: string = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID,
                            apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY): string {
        return GoogleServices.googlePlacesApiUrl(placeId, apiKey, locale);
};

    constructor(language: string, apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY, placeId: string = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID, htmlContainer: HTMLDivElement | google.maps.Map | null = null) {
        if (!GoogleServices.loader){
            GoogleServices.loader = new Loader({
                apiKey: apiKey,
                version: 'beta',
                libraries: ['places'],
                language: language
            });
        }

        this.placesLib = GoogleServices.loader.importLibrary('places');
        // this.place = this.fetchPlace(placeId, htmlContainer ?? this.createHtmlContainerRuntime());
        this.placeId = placeId;
        this.apiKey = apiKey;
    };

    public async PlacesLibrary() {
        return await this.placesLib;
    };

    public async fetchPlace(placeId: string, htmlContainer: HTMLDivElement | google.maps.Map): Promise<google.maps.places.PlaceResult | undefined> {
        return new Promise(async resolve => {
            
            const request: google.maps.places.PlaceDetailsRequest = {
                placeId,
                fields: ['reviews']
            };
            
            await this.placesLib;
            const placesService = new google.maps.places.PlacesService(htmlContainer);

            let timer: NodeJS.Timeout | undefined = undefined;
            for(let i = 0; i < 100; i++) {
                placesService.getDetails(request, async (place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        if (place && place.reviews) {
                            clearTimeout(timer);
                            resolve(place);
                        }
                    } else {
                        console.error(`Error fetching place details: ${status}`);
                        await new Promise(resolve => timer = setTimeout(resolve, 1500));
                    }
                });
            }
            
            clearTimeout(timer);
            resolve(undefined);
        });
    };

    // public async fetchCustomerReviews(): Promise<google.maps.places.PlaceReview[]> {
    //     const place = await this.place;
    //     const reviews = place?.reviews ?? [];
        
    //     return reviews.filter(review => review.rating && review.rating > 3);
    // };

    private createHtmlContainerRuntime(): HTMLDivElement | google.maps.Map {
        const newContainer = document.createElement('div');
        newContainer.id = 'googleServiceContainer';

        const parent = document.querySelector('#app') ?? document.body;
        parent.appendChild(newContainer);

        return newContainer;
    }
}

export default GoogleServices;