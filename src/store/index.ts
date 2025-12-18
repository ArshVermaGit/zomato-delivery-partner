import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import deliveryReducer from './slices/deliverySlice';
import locationReducer from './slices/locationSlice';
import { api } from '../services/api/baseApi';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'], // Persist only auth, delivery state resets on app restart for now
};

const rootReducer = combineReducers({
    auth: authReducer,
    delivery: deliveryReducer,
    location: locationReducer,
    [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
