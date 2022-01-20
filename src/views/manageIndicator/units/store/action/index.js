import axios from '../../../../../axios'

// ** Get Source data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/UnitMeasure/GetUnitMeasuresWithPagination', params).then(response => {
      console.log("getData", response)
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

// export const getSourceValue = params => {
//   return async (dispatch, getState) => {
//       const indicator = getState().indicators.data.find(ind => ind.id === params)
//       dispatch({type:"GET_SOURCE", selectedSource: params})
//   }
// }

// ** Add new indicator
export const addSource = source => {
console.log("source", source)
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


export const updateSource = source => {  
  console.log("source", source)

  return async (dispatch, getState) => {
    await axios
     .put('/Source/UpdateSource/', source)
     .then(response => {
       dispatch({
         type: 'UPDATE_SOURCE',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
   
     .catch(error => {
         dispatch({
             type: 'UPDATE_SOURCE',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
     .then(() => {
      dispatch(getData(getState().sources.params))
    })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_UPDATE_SOURCE_RESPONSE"})
  }
}


// ** Get Source
export const getSource = id => {
  return async dispatch => {
    await axios
      .get(`/Source/GetSource/${id}`)
      .then(response => {
        console.log("GetSource", response)
        dispatch({
          type: 'GET_SOURCE',
          selectedSource: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_SOURCE',
          selectedSource: {},
          errorCode: err.response.status
        })
      })
      
  }
}


// ** Delete Source
export const deleteSource = id => {
  console.log(id)
  return (dispatch, getState) => {
    axios
      .delete('/Source/DeleteSource/', {data: {
        id
      }})
      .then(response => {
        console.log(response)
        dispatch({
          type: 'DELETE_SOURCE',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().sources.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_SOURCE',
          errorCode: error.response.status 
        })
      })
  }
}

