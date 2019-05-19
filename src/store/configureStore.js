import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import setStartEndDayTime from './reducers/settingsReducer';
import setNewGoal from './reducers/goalReducer'

const reducers = combineReducers({
  setStartEndDayTime,
  setNewGoal
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
