import { configureStore, combineReducers } from '@reduxjs/toolkit'
import siteDataSlice from './siteDataReducer'
import storage from 'redux-persist/lib/storage'
import { persistStore,
         persistReducer,
         FLUSH,
         REHYDRATE,
         PAUSE,
         PERSIST,
         PURGE,
         REGISTER,
 } from 'redux-persist'

const rootReducer = combineReducers({
  market: siteDataSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store =  configureStore({
  reducer: {
    intex: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store;