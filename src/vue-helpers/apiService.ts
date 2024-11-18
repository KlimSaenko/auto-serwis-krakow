import { getConfigConst } from '@/vue-helpers/configValues';
import { getCookie } from 'typescript-cookie';

class ApiService {
    public static async GetGoogleReviews(locale: string): Promise<google.maps.places.Review[] | undefined> {
        const configReviews = getConfigConst("googleReviews." + locale) as [google.maps.places.Review];

        return configReviews;
    };

    public static async Login(password: string): Promise<boolean> {
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

    public static async VerifyToken(token: string | undefined = undefined): Promise<boolean> {
        token = token ?? getCookie('frontauto_access_token');

        if (!token) {
            return false;
        }

        try {
            const response = await fetch('/api/admin/verifyToken', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'application/json',
                    'Content-Length': '0'
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Error verifying token');
            return false;
        }
    };

    public static async PostBlogPost(blogPostUrl: string, blogPostJson: string) {
        try {
            const response = await fetch('/api/admin/createBlogPost', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+ getCookie('frontauto_access_token'),
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