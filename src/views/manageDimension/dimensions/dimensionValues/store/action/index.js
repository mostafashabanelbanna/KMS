import axios from '../../../../../../axios'

// ** Get Source data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/DimensionValue/GetDimesionValuesWithPagination', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : [],
        errorCode : error.response.status
      })
    })
  }
}

// ** Add new DimensionValue
export const addDimensionValue = dimensionValue => {
   return (dispatch, getState) => {
    axios
      .post('/DimensionValue/CreateDimensionValue', dimensionValue)
      .then(response => {
        dispatch({
          type: 'ADD_DIMENSION_VALUE',
          dimensionValue,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'ADD_DIMENSION_VALUE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().dimensionValues.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_DIMENSION_VALUE_RESPONSE"})
  }
}


export const updateDimensionValue = dimensionValue => {  
  return async (dispatch, getState) => {
    await axios
     .put('/DimensionValue/UpdateDimensionValue/', dimensionValue)
     .then(response => {
       dispatch({
         type: 'UPDATE_DIMENSION_VALUE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
   
     .catch(error => {
         dispatch({
             type: 'UPDATE_DIMENSION_VALUE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
     .then(() => {
      dispatch(getData(getState().dimensionValues.params))
    })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_UPDATE_DIMENSION_VALUE_RESPONSE"})
  }
}


// ** Get Source
export const getDimensionValue = id => {
  return async dispatch => {
    await axios
      .get(`/DimensionValue/GetDimensionValue/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_DIMENSION_VALUE',
          selectedDimensionValue: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_DIMENSION_VALUE',
          selectedDimensionValue: {},
          errorCode: err.response.status
        })
      })
      
  }
}


// ** Delete Source
export const deleteDimensionValue = id => {
  return (dispatch, getState) => {
    axios
      .delete('/DimensionValue/DeleteDimensionValue/', {data: {
        id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_DIMENSION_VALUE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().dimensionValues.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_DIMENSION_VALUE',
          errorCode: error.response.status 
        })
      })
  }
}

