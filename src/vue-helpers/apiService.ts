import { getConfigConst } from '@/vue-helpers/configValues';

class ApiService {
    static async GetGoogleReviews(locale: string): Promise<google.maps.places.Review[] | undefined> {
        const configReviews = getConfigConst("googleReviews." + locale) as [google.maps.places.Review];

        return configReviews;
    };
};
// :author-name="review.author_name"
// :author-photo-src="review.profile_photo_url"
// :review-text="review.text"
// :relative-time-description="review.relative_time_description"
// :rating="review.rating"
// :author-url="review.author_url"
export default ApiService;