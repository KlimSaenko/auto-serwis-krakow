import ApiService from './apiService';
import { ref, type Ref } from 'vue';

class AdminInputListener {
    private static isAuthorized: Ref<boolean> = ref(AdminInputListener.OnScriptLoad());

    private static set IsAuthorized(isAuthorized: boolean) {
        if (!AdminInputListener.isAuthorized.value){
            AdminInputListener.isAuthorized.value = isAuthorized;
        }
    }

    public static get IsAuthorized(): Ref<boolean> {
        return AdminInputListener.isAuthorized;
    }

    private static OnScriptLoad() {
        ApiService.VerifyToken().then(result => AdminInputListener.IsAuthorized = result);
        return false;
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