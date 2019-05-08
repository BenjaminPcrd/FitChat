import { createStore, combineReducers } from 'redux';
import setStartEndDayTime from './reducers/settingsReducer';
import setNewGoal from './reducers/goalReducer'

const reducers = combineReducers({
  setStartEndDayTime,
  setNewGoal
})
const store = createStore(reducers)
export default store
