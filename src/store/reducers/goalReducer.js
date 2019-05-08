const initialState = {
  goal: 3500,
}

function setNewGoal(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_NEW_GOAL':
      nextState = {
        ...state,
        goal: action.value
      }
      return nextState || state
    default:
      return state
  }
}

export default setNewGoal
