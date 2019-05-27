import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import setStartEndDayTime from './reducers/settingsReducer'
import setNewGoal from './reducers/goalReducer'
import setIsFirstLaunch from './reducers/appIntroSliderReducer'
import setUser from './reducers/userReducer'

const reducers = combineReducers({
  setStartEndDayTime,
  setNewGoal,
  setIsFirstLaunch,
  setUser
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
