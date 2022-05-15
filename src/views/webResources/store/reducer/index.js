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

const FrontWebResources = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FRONT_WEB_RESOURCES_DATA':
            return {...state, webResources: action.data, totalPages: action.totalPages, totalCount: action.totalCount}
        default:
            return {...state}
    }
}

export default FrontWebResources