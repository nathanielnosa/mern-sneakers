import { configureStore } from '@reduxjs/toolkit';

import userSliceReducer from './userSlice';
import productsSlide from './productSlide';

export const store = configureStore({
    reducer:{
        user: userSliceReducer,
        products: productsSlide
    },
})