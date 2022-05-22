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
    categories: [],
    indicatorIds: []
}

const FrontDashboards = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FRONT_DASHBOARDS_DATA':
            return {...state, dashboards: action.data, totalPages: action.totalPages, totalCount: action.totalCount}
        case 'SET_FRONT_DASHBOARDS_INDICATORS':
            return { ...state, indicatorIds: action.indicatorIds }
        case 'SET_FRONT_DASHBOARDS_NAME':
            return { ...state, name: action.name }
        default:
            return {...state}
    }
}

export default FrontDashboards