const initialState = {
    data: [],
    totalPages : 0,
    totalCount : 0,
    pageNumber: 1,
    name: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    periodicities: [],
    sources: [],
    sectors: [],
    categories: []
}

const FrontDocumentIssues = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FRONT_DOCUMENTISSUE_DATA':
            return {...state, data: action.data, totalPages: action.totalPages, totalCount: action.totalCount}
        case 'GET_FRONT_DOCUMENTISSUE_DETAILS':
            return {...state, details: action.data}
        case 'GET_FRONT_DOCUMENTLIBRARIES_DETAILS':
            return {...state, tableData: action.data, totalPages: action.totalPages, totalCount: action.totalCount}
        case 'SET_FRONT_DOCUMENTISSUE_PERIODICITY':
            return {...state, periodicities: action.periodicities}
        case 'SET_FRONT_DOCUMENTISSUE_SOURCE':
            return {...state, sources: action.sources}
        case 'SET_FRONT_DOCUMENTISSUE_SECTOR':
            return {...state, sectors: action.sectors}
        case 'SET_FRONT_DOCUMENTISSUE_CATEGORY':
            return {...state, categories: action.categories}
        case 'SET_FRONT_DOCUMENTISSUE_NAME':
            return {...state, name: action.name}
        case 'SET_FRONT_DOCUMENTISSUE_DATE_FROM':
            return {...state, dateFrom: action.dateFrom}
        case 'SET_FRONT_DOCUMENTISSUE_DATE_TO':
            return {...state, dateTo: action.dateTo}
        case 'SET_DOCUMENTISSUE_PAGE_NUMBER':
            return {...state, pageNumber: action.pageNumber}
        default:
            return {...state}
    }
}

export default FrontDocumentIssues