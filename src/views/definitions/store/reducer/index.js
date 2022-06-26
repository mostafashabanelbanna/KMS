const initialState = {
    data: [],
    totalPages : 0,
    totalCount : 0,
    name: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    periodicities: [],
    sources: [],
    sectors: [],
    categories: []
}

const FrontDefinitions = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FRONT_DEFINITIONS_DATA':
            return {...state, definitions: action.data, totalPages: action.totalPages, totalCount: action.totalCount}
        case 'SET_FRONT_DEFINITIONS_SOURCE':
            return { ...state, sources: action.sources }
        case 'SET_FRONT_DEFINITIONS_NAME':
            return { ...state, name: action.name }
        default:
            return {...state}
    }
}

export default FrontDefinitions