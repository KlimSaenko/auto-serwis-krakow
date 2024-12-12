import ApiService from './apiService';
import { ref, type Ref } from 'vue';

class AdminInputListener {
    private static isAuthorized: Ref<Promise<boolean>> = ref(AdminInputListener.OnScriptLoad());

    public static set IsAuthorized(isAuthorized: boolean) {
        AdminInputListener.isAuthorized.value = Promise.resolve(isAuthorized);
    }

    public static get IsAuthorized(): Ref<Promise<boolean>> {
        return AdminInputListener.isAuthorized;
    }

    private static async OnScriptLoad() {
        return await ApiService.VerifyToken();
    }

    public static OpenPrompt(): string | undefined {
        const input = prompt('Please enter password:');

        if (input){
            ApiService.Login(input).then(result => AdminInputListener.IsAuthorized = result);
            
            return 'Login request has been sent';
        } else {
            alert('Password is required! Please try again');
        }
    }
}

export default AdminInputListener;