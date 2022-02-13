import axios from '../../../../../axios'

// getdata
export const getData = params => {
  console.log(params)
  return async dispatch => {
    await axios.post('/Periodicity/GetPeriodicitiesWithPagination', params)
    .then(response => {
      console.log("getData", response)
      dispatch({
        type: 'GET_PERIODICITIES_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
    }).catch(error => {
      dispatch({
        type: 'GET_PERIODICITIES_DATA',
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

// add priodicity
export const addPeriodicity = periodicity => {
//console.log("source", periodicity)
   return (dispatch, getState) => {
     
    
    axios
      .post('/Periodicity/CreatePeriodicity', periodicity)
      .then(response => {
        
        console.log(response)
        

        dispatch({
          type: 'ADD_PERIODICITY',
          periodicity,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'ADD_PERIODICITY',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().periodicities.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_PERIODICITIES_RESPONSE"})
  }
}


export const updatePeriodicity = periodicity => {  
  

  return async (dispatch, getState) => {
    await axios
     .put('/periodicity/UpdatePeriodicity/', periodicity)
     .then(response => {
       dispatch({
         type: 'UPDATE_PERIODICITY',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
   
     .catch(error => {
         dispatch({
             type: 'UPDATE_PERIODICITY',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
     .then(() => {
      dispatch(getData(getState().periodicities.params))
    })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_UPDATE_PERIODICITIES_RESPONSE"})
  }
}

// ** Get Periodicity
export const getPeriodicity = id => {
  return async dispatch => {
    await axios
      .get(`/Periodicity/GetPeriodicity/${id}`)
      .then(response => {
        //console.log("GetSource", response)
        dispatch({
          type: 'GET_PERIODICITY',
          selectedPeriodicity: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_PERIODICITY',
          selectedPeriodicity: {},
          errorCode: err.response.status
        })
      })
      
  }
}


// ** Delete periodicity
export const deletePeriodicitey = id => {
  console.log(id)
  return (dispatch, getState) => {
    axios
      .delete('/periodicity/DeletePeriodicity/', {data: {
        id
      }})
      .then(response => {
        console.log(response)
        dispatch({
          type: 'DELETE_PERIODOCITY',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().sources.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_PERIODOCITY',
          errorCode: error.response.status 
        })
      })
  }
}

