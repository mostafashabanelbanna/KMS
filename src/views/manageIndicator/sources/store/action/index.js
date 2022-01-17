import axios from '../../../../../axios'

// ** Get Indicator data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/Source/GetSourcesWithPagination', params).then(response => {
      console.log(response)
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

// export const getIndicatorValue = params => {
//   return async (dispatch, getState) => {
//       const indicator = getState().indicators.data.find(ind => ind.id === params)
//       dispatch({type:"GET_INDICATOR", selectedIndicator: params})
//   }
// }

// ** Add new indicator
export const addSource = source => {
console.log(indicator)
   return (dispatch, getState) => {
    axios
      .post('/Source/CreateSource', source)
      .then(response => {
        
        console.log(response)

        dispatch({
          type: 'ADD_SOURCE',
          source,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_SOURCE',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().sources.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_SOURCE_RESPONSE"})
  }
}


export const updateIndicator = indicator => {  

  return async (dispatch, getState) => {
    await axios
     .put('/Indicator/UpdateIndicator/', indicator)
     .then(response => {
       console.log(response)
       dispatch({
         type: 'UPDATE_INDICATOR',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
   
     .catch(error => {
         dispatch({
             type: 'UPDATE_INDICATOR',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
     .then(() => {
      dispatch(getData(getState().indicators.params))
    })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_INDICATOR_UPDATE_RESPONSE"})
  }
}


// ** Get Indicator
export const getIndicator = id => {
  console.log(id)
  return async dispatch => {
    await axios
      .get(`/Indicator/GetIndicator/${id}`)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'GET_INDICATOR',
          selectedIndicator: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        console.log(err)

        dispatch({
          type: 'GET_INDICATOR',
          selectedIndicator: {},
          errorCode: err.response.status
        })
      })
  }
}


// ** Delete Indicator
export const deleteIndicator = id => {
  return (dispatch, getState) => {
    axios
      .delete('/Indicator/DeleteIndicator/', {data: {
        id
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_INDICATOR',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().indicators.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_INDICATOR',
          errorCode: error.response.status 
        })
      })
  }
}

