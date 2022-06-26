import axios from '../../../../../axios'
  import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'


// ** Get Indicator data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())

    await axios.post('/Indicator/GetIndicatorsWithPagination', params).then(response => {
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

// export const getIndicatorValue = params => {
//   return async (dispatch, getState) => {
//       const indicator = getState().indicators.data.find(ind => ind.id === params)
//       dispatch({type:"GET_INDICATOR", selectedIndicator: params})
//   }
// }
// ** Add new indicator
export const addIndicator = indicator => {
console.log(indicator)
   return (dispatch, getState) => {
    axios
      .post('/Indicator/CreateIndicator', indicator)
      .then(response => {
        
        console.log(response)

        dispatch({
          type: 'ADD_INDICATOR',
          indicator,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_INDICATOR',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().indicators.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_INDICATOR_RESPONSE"})
  }
}


export const updateIndicator = indicator => {  
  console.log(indicator)
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

