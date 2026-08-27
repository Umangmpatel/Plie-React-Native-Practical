import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export async function getEventsListing() {
    try {
        const res: any = await apiClient.POST(ENDPOINTS.events.listing);
        if (res.success || res.status || res.data) {
            return { success: true, data: res.data, message: res.message || 'Success' };
        } else {
            return { success: false, message: res.message || 'Failed to fetch events' };
        }
    } catch (error) {
        console.log('getEventsError Error: ', error);
        return { success: false, message: 'Oops, Something Went Wrong' };
    }
}
