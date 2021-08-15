export const initialState = {
  basket: [],
  user: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item]
      }
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(item => item.id === action.id)
      if (index !== -1) {
        state.basket.splice(index, 1)
      }
      return {
        ...state
      }
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      }
    default:
      return state
  }
}

export default reducer