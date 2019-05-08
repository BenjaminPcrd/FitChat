const initialState = {
  startDayHour: 8,
  startDayMinute: 0,
  endDayHour: 22,
  endDayMinute: 0
}

function setStartEndDayTime(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_START_DAY_TIME':
      nextState = {
        ...state,
        startDayHour: action.value.hour,
        startDayMinute: action.value.minute
      }
      return nextState || state
    case 'SET_END_DAY_TIME':
      nextState = {
        ...state,
        endDayHour: action.value.hour,
        endDayMinute: action.value.minute
      }
      return nextState || state
    default:
      return state
  }
}

export default setStartEndDayTime
