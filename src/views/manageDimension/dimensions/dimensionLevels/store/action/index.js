import axios from '../../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../../redux/actions/layout'

// ** Get Source data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/DimensionsLevel/GetDimensionLevelsWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      dispatch(isNotLoading())
    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : [],
        errorCode : error.response.status
      })
      dispatch(isNotLoading())
    })
  }
}

// ** Add new DimensionLevel
export const addDimensionLevel = dimensionLevel => {
   return (dispatch, getState) => {
    axios
      .post('/DimensionLevel/CreateDimensionLevel', dimensionLevel)
      .then(response => {
        dispatch({
          type: 'ADD_DIMENSION_LEVEL',
          dimensionLevel,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'ADD_DIMENSION_LEVEL',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().dimensionLevels.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_DIMENSION_LEVEL_RESPONSE"})
  }
}


export const updateDimensionLevel = dimensionLevel => {  
  return async (dispatch, getState) => {
    await axios
     .put('/DimensionsLevel/UpdateDimensionLevel/', dimensionLevel)
     .then(response => {
       dispatch({
         type: 'UPDATE_DIMENSION_LEVEL',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
        })
      })
      
      .catch(error => {
        console.log(error)
        dispatch({
             type: 'UPDATE_DIMENSION_LEVEL',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
     .then(() => {
      dispatch(getData(getState().dimensionLevels.params))
    })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_UPDATE_DIMENSION_LEVEL_RESPONSE"})
  }
}


// ** Get Source
export const getDimensionLevel = (dimensionId, levelNumber) => {
  return async dispatch => {
    await axios
    .get(`/DimensionsLevel/GetDimensionLevel/${dimensionId}/${levelNumber}`)
    .then(response => {
        console.log(response)
        dispatch({
          type: 'GET_INNER_DIMENSION_VALUE',
          selectedDimensionLevel: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_INNER_DIMENSION_VALUE',
          selectedDimensionLevel: {},
          errorCode: err.response.status
        })
      })
      
  }
}


// ** Delete Source
export const deleteDimensionLevel = id => {
  return (dispatch, getState) => {
    axios
      .delete('/DimensionLevel/DeleteDimensionLevel/', {data: {
        id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_DIMENSION_LEVEL',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().dimensionLevels.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_DIMENSION_LEVEL',
          errorCode: error.response.status 
        })
      })
  }
}

