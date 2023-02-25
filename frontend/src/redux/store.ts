import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSliceReducer } from './slices/authSlice';

import { notificationsSliceReducer } from './slices/notificationsSlice';

import { apiSlice } from '../service';

const rootReducer = combineReducers({
    auth: authSliceReducer,
    notifications: notificationsSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
