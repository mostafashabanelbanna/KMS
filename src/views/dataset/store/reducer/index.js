const initialState = {
    // slelect lists in Dataset meta data
    classifications:[],
    classificationValues:[],
    indicators:[],
    sources:[],
    periodicities:[],
    indicatorUnits:[],
    indicatorDimensions:[],

    // selected values and vertical , horizontal dimensions that used for export excel file
    classificationValueId:1,
    indicatorId:1,
    sourceId:1,
    periodicityId:12,
    indicatorUnitId:1,
    insertionDate:'2020-12-31',
    vertical:[],
    horizontal:[],

    // responses Code

    exportResponse:{
        errorCode:0
    },
    importResponse:{
        error : {},
        statusCode: 0,
        errors: []
    },
    onChangeResponse: {
        error : {},
        statusCode: 0,
        errors: []
    }
}


const datasets = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATASET_CLASSIFICATIONS':
            return {...state, classifications: action.classifications}

        case 'GET_DATASET_CLASSIFICATION_VALUES':
            return {...state, classificationValues: action.classificationValues}
        
        case 'GET_DATASET_INDICATORS':
            return {...state, indicators: action.indicators}

        case 'GET_DATASET_INDICATOR_DIMENSIONS':
            return {...state, indicatorDimensions: action.indicatorDimensions}

        case 'GET_DATASET_INDICATORS_BASED_DATA':
            return {
                ...state,
                sources: action.sources, 
                periodicities: action.periodicities, 
                indicatorUnits: action.indicatorUnits, 
                indicatorDimensions: action.indicatorDimensions
            }
        case 'SET_DATASET_SELECTED_META_DATA':
            return {
                ...state,
                 classificationValueId: action.classificationValueId,
                 indicatorId: action.indicatorId, 
                 sourceId: action.sourceId, 
                 periodicityId: action.periodicityId,
                indicatorUnitId: action.indicatorUnitId, 
                 insertionDate: action.insertionDate}
        
        case 'SET_DATASET_VERTICAL':
            return {...state, vertical: action.vertical}
        
        case 'SET_DATASET_HORIZONTAL':
            return {...state, horizontal: action.horizontal}
        
        case 'SET_DATASET_EXPORT_RESPONSE':
            return {...state, exportResponse: action.exportResponse}
        
        case 'SET_DATASET_EXPORT_RESPONSE':
            return {...state, exportResponse: action.exportResponse}
        
        case 'RESET_DATASET_EXPORT_RESPONSE':
            return {...state, exportResponse: { errorCode: 0}}
        
        case 'SET_DATASET_IMPORT_RESPONSE':
            return {...state, importResponse: action.importResponse}
            
        case 'RESET_DATASET_IMPORT_RESPONSE':
            return {...state, importResponse: {statusCode: 0, errors: [], error : {}}}

        case 'SET_DATASET_ONCHANGE_RESPONSE':
            return {...state, onChangeResponse: action.onChangeResponse}
                
        case 'RESET_DATASET_ONCHANGE_RESPONSE':
            return {...state, onChangeResponse: {statusCode: 0, errors: [], error : {}}}
        
        
      default:
        return { ...state }
    }
  }
  export default datasets