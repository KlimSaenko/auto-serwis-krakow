import { getConfigConst } from '@config/configValues';
import { getCookie } from 'typescript-cookie';

class ApiService {
    public static async GetGoogleReviews(locale: string): Promise<google.maps.places.Review[] | undefined> {
        const configReviews = getConfigConst("googleReviews." + locale) as [google.maps.places.Review];

        return configReviews;
    }

    public static async Login(password: string): Promise<boolean> {
        try {
            const response = await fetch(import.meta.env.BASE_URL + 'api/login', {
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

            return response.ok;
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
    }

    public static async VerifyToken(token: string | undefined = undefined): Promise<boolean> {
        token = token || getCookie('frontauto_access_token');

        if (!token) {
            return false;
        }

        try {
            const response = await fetch(import.meta.env.BASE_URL + 'api/admin/verifyToken', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'application/json',
                    'Content-Length': '0'
                }
            });

            return response.status === 204;
        } catch (error) {
            console.error('Error verifying token');
            return false;
        }
    }

    public static async CreateBlogPost(filename: string, title: string, content: string, previewText?: string) {
        try {
            const response = await fetch(import.meta.env.BASE_URL + `api/admin/blog/${filename}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getCookie('frontauto_access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postContent: {
                        title,
                        content,
                        previewText
                    }
                })
            });

            const result = await ApiService.VerifyResponse(response).json();
            console.log(result.message);
        } catch (error) {
            console.error('Error creating file: ', error);
        }
    }

    public static async UpdateBlogPost(filename: string, title: string, content: string) {
        try {
            const response = await fetch(import.meta.env.BASE_URL + `api/admin/blog/${filename}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer '+ getCookie('frontauto_access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postContent: {
                        title,
                        content
                    }
                })
            });

            const result = await ApiService.VerifyResponse(response).json();
            console.log(result.message);
        } catch (error) {
            console.error('Error updating file: ', error);
        }
    }

    public static async GetBlogPost(filename: string): Promise<any | undefined> {
        try {
            const response = await fetch(import.meta.env.BASE_URL + `api/blog/${filename}`, {
                method: 'GET'
            });

            const result = await response.json();
            return result.filedata;
        } catch (error) {
            console.error('Error retrieving file: ', error);
        }
    }

    public static async GetBlogPosts(page: number, loadCount?: number): Promise<{ posts: any[], pageCount: number } | undefined> {
        try {
            const response = await fetch(import.meta.env.BASE_URL + `api/blog/p/${page}` +
                (loadCount ? ('?' + new URLSearchParams({ 'loadCount': loadCount.toString() })) : ''),
            {
                method: 'GET'
            });

            const result = await response.json();
            return result as { posts: any[], pageCount: number };
        } catch (error) {
            console.error('Error retrieving files: ', error);
        }
    }

    public static async UploadFile(data: FormData): Promise<string | undefined> {
        try {
            URL
            const response = await fetch(import.meta.env.BASE_URL + 'api/admin/uploader', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+ getCookie('frontauto_access_token')
                },
                body: data
            });

            const { filePath } = await ApiService.VerifyResponse(response).json();

            return filePath;
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    }

    public static async GetServerTime() {
        try {
            const response = await fetch(import.meta.env.BASE_URL + 'api/getServerTime', {
                method: 'GET'
            });

            const { isOpen, timeElapsed } = await response.json();
            return { isOpen, time: new Date(timeElapsed) };
        } catch (error) {
            console.error(error);
        }
    }

    private static VerifyResponse(response: Response) {
        if (response.status === 401 || response.status === 403) {
            throw new Error(`HTTP error. Not authorized`);
        }

        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        return response;
    }
};

export default ApiService;