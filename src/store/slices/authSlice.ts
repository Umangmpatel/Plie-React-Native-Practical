import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userLogin as userLoginApi } from '../../services/api/auth.api';
import { User } from '../../types/auth';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response: any = await userLoginApi(credentials);
            if (response.success && response.data?.token) {
                // The provided postman response has nested token inside data
                return { token: response.data.token, user: response.data.user };
            } else if (response.success && response.token) {
                return { token: response.token, user: response.data };
            } else {
                return rejectWithValue(response.message || 'Invalid credentials');
            }
        } catch (error: any) {
            return rejectWithValue(error?.message || 'Network Error');
        }
    }
);

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'An error occurred';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
