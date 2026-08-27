import axios, { AxiosResponse } from 'axios';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URI = 'https://techeruditestaging.com/projects/plie-api/public/api';

class ApiClient {
    private store: any = null;

    injectStore(store: any) {
        this.store = store;
    }

    constructor() {
        // Clear any existing default headers
        axios.defaults.headers.common = {};
        // Set basic default headers
        this.defaultHeader({
            'X-API-KEY': '1234567890abcdefghijklmnopqrstuvwxyz1234',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    defaultHeader(object: any) {
        axios.defaults.headers.common = { ...object };
    }

    // Helper method to resolve Headers dynamically
    getHeaders(customHeaders: any = {}) {
        let token = null;
        if (this.store) {
            const state = this.store.getState();
            token = state.auth?.token;
        }

        return {
            'X-API-KEY': '1234567890abcdefghijklmnopqrstuvwxyz1234',
            // Attach token if user is signed in
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...customHeaders,
        };
    }

    GET(endpoint: string, params: any = {}, customHeaders: any = {}) {
        return new Promise(resolve => {
            axios({
                method: 'GET',
                url: this.normalizePath(endpoint),
                params,
                headers: this.getHeaders(customHeaders),
                validateStatus: function (status) {
                    return status !== 404;
                },
            })
                .then(response => {
                    this.logAPI('GET', endpoint, params, customHeaders, response);
                    resolve(response.data);
                })
                .catch(error => this.handleError(error, resolve));
        });
    }

    POST(endpoint: string, params: any = {}, customHeaders: any = {}) {
        return new Promise(resolve => {
            axios({
                method: 'post',
                url: this.normalizePath(endpoint),
                data: params,
                headers: this.getHeaders(customHeaders),
                validateStatus: function (status) {
                    return status !== 404;
                },
            })
                .then(response => {
                    this.logAPI('POST', endpoint, params, customHeaders, response);
                    resolve(response.data);
                })
                .catch(error => this.handleError(error, resolve));
        });
    }

    DELETE(endpoint: string, params: any = {}, customHeaders: any = {}) {
        return new Promise(resolve => {
            axios({
                method: 'delete',
                url: this.normalizePath(endpoint),
                params,
                headers: this.getHeaders(customHeaders),
                validateStatus: function (status) {
                    return status !== 404;
                },
            })
                .then(response => {
                    this.logAPI('DELETE', endpoint, params, customHeaders, response);
                    resolve(response.data);
                })
                .catch(error => this.handleError(error, resolve));
        });
    }

    PUT(endpoint: string, params: any = {}, customHeaders: any = {}) {
        return new Promise(resolve => {
            axios({
                method: 'put',
                url: this.normalizePath(endpoint),
                data: params,
                headers: this.getHeaders(customHeaders),
                validateStatus: function (status) {
                    return status !== 404;
                },
            })
                .then(response => {
                    this.logAPI('PUT', endpoint, params, customHeaders, response);
                    resolve(response.data);
                })
                .catch(error => this.handleError(error, resolve));
        });
    }

    private logAPI(method: string, endpoint: string, params: any, customHeaders: any, response: AxiosResponse) {
        if (__DEV__) {
            console.log(
                'headers:', this.getHeaders(customHeaders),
                `${method} endpoint:`, endpoint,
                'API params:', params,
                'API Response:', JSON.stringify(response.data)
            );
        }
    }

    handleError(error: any, resolve: (val: any) => void) {
        console.log('API error:', error);
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                resolve({ success: false, message: 'Oops! Something is wrong' });
            } else {
                resolve({ success: false, message: 'You are currently offline' });
            }
        });
    }

    normalizePath(endpoint: string) {
        if (__DEV__) {
            console.log('api endpoint: ', `${API_BASE_URI}/${endpoint}`);
        }
        return `${API_BASE_URI}/${endpoint}`;
    }
}

export default new ApiClient();
