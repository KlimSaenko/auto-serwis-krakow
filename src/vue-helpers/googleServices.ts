import { Loader } from '@googlemaps/js-api-loader';

class GoogleServices {
    private static loader: Loader;
    private placesLib: Promise<google.maps.PlacesLibrary>;

    get Loader() {
        return GoogleServices.loader;
    };

    constructor(language: string, apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
        if (!GoogleServices.loader){
            GoogleServices.loader = new Loader({
                apiKey: apiKey,
                version: 'beta',
                libraries: ['places'],
                language: language
            });
        }
        
        this.placesLib = GoogleServices.loader.importLibrary('places');
    }

    public async PlacesLibrary() {
        return await this.placesLib;
    }

    public async fetchCustomerReviews(placeId: string, htmlContainer: HTMLDivElement): Promise<google.maps.places.PlaceReview[]> {
        return new Promise(async resolve => {
            const request: google.maps.places.PlaceDetailsRequest = {
                placeId,
                fields: ['reviews']
            };
            
            await this.placesLib;
            const placesService = new google.maps.places.PlacesService(htmlContainer);
            
            placesService.getDetails(request, (place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (place && place.reviews) {
                        resolve(place.reviews);
                    }
                } else {
                    console.error(`Error fetching place details: ${status}`);
                }
                resolve([]);
            });
        });
    }
}

export default GoogleServices;