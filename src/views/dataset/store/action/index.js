import axios from '../../../../axios'

export const getAllClassifications = () => {
  return async dispatch => {
    await axios.get('/Classification/GetClassifications')
      .then(response => {
        dispatch({
          type: 'GET_DATASET_CLASSIFICATIONS',
          classifications: response.data.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'GET_DATASET_CLASSIFICATIONS',
          classifications : []
        })
      })
  }
}

export const getClassificationValues = (classificationId) => {
  return async (dispatch) => {
    await axios.get(`/ClassificationValue/GetClassificationValues/${classificationId}`)
    .then(response => {
        dispatch({
          type: 'GET_DATASET_CLASSIFICATION_VALUES',
          classificationValues: response.data.data
        })
    })
    .catch(error => {
      dispatch({
        type: 'GET_DATASET_CLASSIFICATION_VALUES',
        classificationValues : []
      })
    })
  }
}


export const getIndicators = (classificationValueId) => {
  return async (dispatch) => {
    await axios.get(`/Indicator/GetIndicators/${classificationValueId}`)
    .then(response => {
        dispatch({
          type: 'GET_DATASET_INDICATORS',
          indicators: response.data.data
        })
      })
    .catch(error => {
      dispatch({
        type: 'GET_DATASET_INDICATORS',
        indicators : []
      })
    })
  }
}

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

export const getIndicatorBasedLists = indicatorId => {
  return async dispatch => {
      await axios.get(`/Indicator/GetIndicatorForDataset/${indicatorId}`).then(response => {
        console.log(response)
        dispatch({
          type: 'GET_DATASET_INDICATORS_BASED_DATA',
          indicatorDimensions: response.data.data.indicatorDimensions,
          sources: response.data.data.indicatorSources,
          periodicities: response.data.data.indicatorPeriodicities,
          indicatorUnits: response.data.data.indicatorUnits
        })
      }).catch(error => {
        dispatch({
          type: 'GET_DATASET_INDICATORS_BASED_DATA',
          indicatorDimensions: [],
          sources: [],
          periodicities: [],
          indicatorUnits: []
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
            unitId: datasetStore.indicatorUnitId,
            classificationValueId: datasetStore.classificationValueId,
            insertionDate: datasetStore.insertionDate,
            vertical: datasetStore.vertical,
            horizontal: datasetStore.horizontal
        }
        console.log(postObject)
        await axios.post(`/Dataset/ExportIndicatorDataSheet`, postObject, { responseType: 'arraybuffer' }).then(response => {
          console.log("Success")
          console.log(response.data)
          const fileDownload = require('js-file-download')
          fileDownload(response.data, 'DataSheet.xlsx')
          dispatch({
            type: 'SET_DATASET_EXPORT_RESPONSE',
            exportResponse: { errorCode : 200}
          })
        }).catch(error => {
          console.log(error)
          if (error && error.response) {
            dispatch({
              type: 'SET_DATASET_EXPORT_RESPONSE',
              exportResponse: { errorCode : error.response.status}
            })
          } else {
            dispatch({
              type: 'SET_DATASET_EXPORT_RESPONSE',
              exportResponse: { errorCode : 500}
            })
          }
         
        })
    }
}

export const importFile = (file) => {
  console.log(file)
    const importFormData = new FormData()
    importFormData.append('file', file[0])
    return async dispatch => {
        await axios.post(`/Dataset/ImportIndicatorDataSheet`, importFormData).then(response => {
          console.log(response)
            dispatch({
              type: 'SET_DATASET_IMPORT_RESPONSE',
              importResponse: {statusCode: response.data.statusCode, errors: response.data.errors, error:{}}
            })
          }).catch(error => {
            dispatch({
              type: 'SET_DATASET_IMPORT_RESPONSE',
              importResponse: {statusCode: error.response.status, errors: [], error:{}}
            })
        })
    }
}