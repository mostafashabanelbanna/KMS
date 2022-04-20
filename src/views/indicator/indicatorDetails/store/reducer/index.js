const initialState = {
    indicatorDetails:{}
}

const indicatorDetails = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INDICATOR_DETAILS':
            return {...state, indicatorDetails: action.indicatorDetails}
        default:
            return {...state}
    }
}

export default indicatorDetails