import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export async function userLogin(data: any) {
    try {
        const res: any = await apiClient.POST(ENDPOINTS.auth.login, data);

        console.log('\n============== LOGIN API RESPONSE ==============');
        console.log(JSON.stringify(res, null, 2));
        console.log('================================================\n');

        if (res.success || res.token || res.data?.token || res.message === 'Login Success') {
            return {
                success: true,
                data: res.data || res,
                token: res.token || res.data?.token,
                message: res.message || 'Login Successful'
            };
        } else {
            return { success: false, message: res.message || 'Invalid credentials' };
        }
    } catch (error) {
        console.log('userLogin Error: ', error);
        return { success: false, message: 'Oops, Something Went Wrong' };
    }
}
