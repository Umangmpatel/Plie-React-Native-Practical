import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    favoriteIds: number[];
}

const initialState: FavoritesState = {
    favoriteIds: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<number>) {
            const index = state.favoriteIds.indexOf(action.payload);
            if (index >= 0) {
                state.favoriteIds.splice(index, 1);
            } else {
                state.favoriteIds.push(action.payload);
            }
        },
        clearFavorites(state) {
            state.favoriteIds = [];
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
