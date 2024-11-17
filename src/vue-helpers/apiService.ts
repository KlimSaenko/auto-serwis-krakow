import { getConfigConst } from '@/vue-helpers/configValues';
import { getCookie } from 'typescript-cookie';

class ApiService {
    static async GetGoogleReviews(locale: string): Promise<google.maps.places.Review[] | undefined> {
        const configReviews = getConfigConst("googleReviews." + locale) as [google.maps.places.Review];

        return configReviews;
    };

    static async Login(password: string): Promise<boolean> {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password
                })
            });

            const result = await response.json();
            if (result?.message){
                console.log(result.message);
            }

            return true;
        } catch (error) {
            let message = '';

            if (typeof error === "string") {
                message = error;
            } else if (error instanceof Error) {
                message = error.message;
            }

            console.error('Error login', message);
        }
        
        return false;
    };

    static async PostBlogPost(blogPostUrl: string, blogPostJson: string) {
        try {
            const response = await fetch('/api/admin/createBlogPost', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+ getCookie('access_token'),
                    'Content-Type': 'application/json'
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