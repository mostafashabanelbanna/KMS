import axios from '../../../../../axios'

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

export const getIndicatorDimensions = () => {
    return async (dispatch, getState) => {
        const datasetStore = getState().datasets;
        const postObject = {
            indicatorId: datasetStore.indicatorId,
            sourceId: datasetStore.sourceId,
            periodicityId: datasetStore.periodicityId,
            unitId: datasetStore.unitId,
            classificationValueId: datasetStore.classificationValueId,
            vertical: datasetStore.vertical,
            horizontal: horizontal
        }

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