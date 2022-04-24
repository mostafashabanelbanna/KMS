const initialState = {
    indicatorDetails:{},
    selectedPeriodicity: 0,
    selectedSource: 0,
    seriesDimensions: [],
    seriesDimensionValues: [],
    seriesDateFrom: new Date(),
    seriesDateTo: new Date(),
    seriesData: [],
    seriesDataTotalCount: 0,
    seriesDataTotalPages: 0

}

const indicatorDetails = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INDICATOR_DETAILS':
            return {...state, indicatorDetails: action.indicatorDetails}
        case 'SET_INDICATOR_DETAILS_PERIODICITY':
            return {...state, selectedPeriodicity: action.periodicity}
        case 'SET_INDICATOR_DETAILS_SOURCE':
            return {...state, selectedSource: action.source}
        case 'SET_INDICATOR_DETAILS_SERIES_DIMENSIONS':
            return {...state, seriesDimensions: action.dimensions}
        case 'SET_INDICATOR_DETAILS_SERIES_DIMENSION_VALUES':
            return {...state, seriesDimensionValues: action.dimensionValues}
        case 'SET_INDICATOR_DETAILS_SERIES_DATE_FROM':
            return {...state, seriesDateFrom: action.dateFrom}
        case 'SET_INDICATOR_DETAILS_SERIES_DATE_TO':
            return {...state, seriesDateTo: action.dateTo}
        case 'GET_INDICATOR_DETAILS_SERIES_DATA':
            return {...state, seriesData: action.data, seriesDataTotalCount: action.totalCount, seriesDataTotalPages: action.totalPages}
        
        default:
            return {...state}
    }
}

export default indicatorDetails