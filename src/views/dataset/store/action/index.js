import axios from '../../../../axios'

export const getIndicatorDimensions = indicatorId => {
    return async dispatch => {
        await axios.get(`/Dimension/GetDimensionsByIndicator/${indicatorId}`).then(response => {
          dispatch({
            type: 'GET_DATASET_INDICATOR_DIMENSIONS',
            indicatorDimensions: response.data.data
          })
        }).catch(error => {
          dispatch({
            type: 'GET_DATASET_INDICATOR_DIMENSIONS',
            indicatorDimensions : []
          })
        })
      }
}

export const exportFile = () => {
    return async (dispatch, getState) => {
        const datasetStore = getState().datasets
        const postObject = {
            indicatorId: datasetStore.indicatorId,
            sourceId: datasetStore.sourceId,
            periodicityId: datasetStore.periodicityId,
            unitId: datasetStore.unitId,
            classificationValueId: datasetStore.classificationValueId,
            vertical: datasetStore.vertical,
            horizontal: datasetStore.horizontal
        }
        await axios.post(`/Dataset/ExportIndicatorDataSheet`, postObject).then(response => {
          dispatch({
            type: 'SET_DATASET_EXPORT_RESPONSE',
            exportResponse: { errorCode : 200}
          })
        }).catch(error => {
          dispatch({
            type: 'SET_DATASET_EXPORT_RESPONSE',
            exportResponse: { errorCode : error.response.status}
          })
        })
    }
}

export const importFile = (file) => {
    const importFormData = new FormData()
    importFormData.append('file', file[0])
    return async dispatch => {
        await axios.post(`/Dataset/ImportIndicatorDataSheet`, importFormData).then(response => {
            dispatch({
              type: 'SET_DATASET_EXPORT_RESPONSE',
              importResponse: {statusCode: response.data.statusCode, errors: response.data.errors, error:{}}
            })
          }).catch(error => {
            dispatch({
              type: 'SET_DATASET_EXPORT_RESPONSE',
              importResponse: {statusCode: error.response.status, errors: [], error:{}}
            })
        })
    }
}