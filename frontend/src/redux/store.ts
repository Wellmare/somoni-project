import { configureStore } from '@reduxjs/toolkit';

import api from './api';

// const rootReducer = combineReducers([testReducer]);

const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
