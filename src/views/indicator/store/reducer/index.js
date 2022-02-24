const initialState = {
    classifications:[]
}

const indicators = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLASSIFICATIONS':
            return {...state, classifications: action.classifications}
        default:
            return {...state}
    }
}

export default indicators