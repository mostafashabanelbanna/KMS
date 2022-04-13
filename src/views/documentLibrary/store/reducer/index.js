const initialState = {
    data: [],
    totalPages: 1,
    params: {}
}

const documentLibrary = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                data: action.data,
                totalPages: action.totalPages, 
                params: action.params
            }
        default:
            return {...state}
    }
}


export default documentLibrary