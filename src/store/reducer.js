const initialState = {
    activities: [],
    loading: false,
    addLoading: false,
}

export default function reducer(state = initialState, action) {
    if (action.type === 'SET_ACTIVITIES') {
        return { ...state, activities: action.payload }
    }
    if (action.type === 'SET_LOADING') {
        return { ...state, loading: action.payload }
    }
    if (action.type === 'SET_ADD_LOADING') {
        return { ...state, addLoading: action.payload }
    }
    return state
} 