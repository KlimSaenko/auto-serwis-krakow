import { getConfigConst } from '@/vue-helpers/configValues';

class ApiService {
    static async GetGoogleReviews(locale: string): Promise<google.maps.places.Review[] | undefined> {
        const configReviews = getConfigConst("googleReviews." + locale) as [google.maps.places.Review];

        return configReviews;
    };

    static async LoginAdmin(password: string) {
        try {
            const response = await fetch('/api/loginAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password
                })
            });

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    static async PostBlogPost(blogPostUrl: string, blogPostJson: string) {
        try {
            const response = await fetch('/api/createBlogPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: blogPostUrl,
                    content: blogPostJson
                })
            });

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };
};

export default ApiService;