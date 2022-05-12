const initialState = {
    indicatorDetails:{},
    selectedPeriodicity: 0,
    selectedSource: 0,
    selectedUnit: {},
    seriesDimensions: [],
    seriesDimensionValues: [],
    seriesExcelDimensions: [],
    seriesDateFrom: new Date(),
    seriesDateTo: new Date(),
    seriesData: [],
    seriesDataTotalCount: 0,
    seriesDataTotalPages: 0,
    //Excel Data
    excelDate: new Date(),
    excelDimensions:[],
    exportExcelErrorCode: 200

}

const indicatorDetails = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INDICATOR_DETAILS':
            return {...state, indicatorDetails: action.indicatorDetails}
        case 'SET_INDICATOR_DETAILS_PERIODICITY':
            return {...state, selectedPeriodicity: action.periodicity}
        case 'SET_INDICATOR_DETAILS_SOURCE':
            return {...state, selectedSource: action.source}
        case 'SET_INDICATOR_DETAILS_UNIT':
            return {...state, selectedUnit: action.unit}
        case 'SET_INDICATOR_DETAILS_SERIES_DIMENSIONS':
            return {...state, seriesDimensions: action.dimensions}
        case 'SET_INDICATOR_DETAILS_SERIES_DIMENSION_VALUES':
            return {...state, seriesDimensionValues: action.dimensionValues}
        case 'SET_INDICATOR_DETAILS_SERIES_EXCEL_DIMENSION':
            return {...state, seriesExcelDimensions: action.seriesExcelDimensions} 
        case 'SET_INDICATOR_DETAILS_SERIES_DATE_FROM':
            return {...state, seriesDateFrom: action.dateFrom}
        case 'SET_INDICATOR_DETAILS_SERIES_DATE_TO':
            return {...state, seriesDateTo: action.dateTo}
        case 'GET_INDICATOR_DETAILS_SERIES_DATA':
            return {...state, seriesData: action.data, seriesDataTotalCount: action.totalCount, seriesDataTotalPages: action.totalPages}
        case 'SET_INDICATOR_DETAILS_EXCEL_DATE':
            return {...state, excelDate: action.date}
        case 'SET_INDICATOR_DETAILS_EXCEL_DIMENSIONS':
            return {...state, excelDimensions: action.excelDimensions}
        case 'SET_INDICATOR_DETAILS_EXCEL_EXPORT_RESPONSE':
            return {...state, exportExcelErrorCode: action.errorCode}
        
        default:
            return {...state}
    }
}

export default indicatorDetails