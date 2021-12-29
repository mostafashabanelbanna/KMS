import axios from '../../../../../axios'

export const getLookups = params => {
    return async dispatch => {
      await axios.get('/Lookups/GetAllLookups').then(response => {
        dispatch({
          type: 'GET_LOOKUPS',
          AllLookups: response.data.data.modules
        })
      }).catch(error => {
        dispatch({
          type: 'GET_LOOKUPS',
          AllLookups : []
        })
      })
    }
  }

export const getData = params => {
    return async dispatch => {
      await axios.post('/Lookups/GetLookupValues', params).then(response => {
        dispatch({
          type: 'GET_LOOKUP_DATA',
          data: response.data.data.items,
          totalPages: response.data.data.totalPages,
          lookupName: params.lookupName,
          params
        })
      }).catch(error => {
        dispatch({
          type: 'GET_LOOKUP_DATA',
          data : []
        })
      })
    }
  }

export const getLookupValue = params => {
  return async (dispatch, getState) => {
      const lookup = getState().lookups.data.find(x => x.id === params)
      dispatch({type:"GET_LOOKUP", selectedLookup: lookup})
  }
}

  
export const addLookup = Lookup => {  
     console.log(Lookup)

     return async (dispatch, getState) => {
       await axios
        .post('/Lookups/CreateLookupValue', Lookup)
        .then(response => {
          dispatch({
            type: 'ADD_LOOKUP',
            response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}}
          })
        })
        .then(() => {
          dispatch(getData(getState().lookups.params))
        })
        .catch(error => {
            dispatch({
                type: 'ADD_LOOKUP',
                response:{error: error.response, errors:[], statusCode: error.response.status }
            })
        })
    }
  }

  export const updateLookup = Lookup => {  
    console.log(Lookup)

    return async (dispatch, getState) => {
      await axios
       .put('/Lookups/UpdateLookupValue', Lookup)
       .then(response => {
         dispatch({
           type: 'UPDATE_LOOKUP',
           response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}}
         })
       })
       .then(() => {
         dispatch(getData(getState().lookups.params))
       })
       .catch(error => {
           dispatch({
               type: 'UPDATE_LOOKUP',
               response:{error: error.response, errors:[], statusCode: error.response.status }
           })
       })
   }
 }

// ** Delete lookup value
export const deleteLookupValue = (lookupName, id) => {
  return (dispatch, getState) => {
    axios
      .delete('/Lookups/DeleteLookupValue', {data: {
        Id: id,
        lookupName
      }})
      .then(response => {
        dispatch({
          type: 'DELETE_LOOKUP',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().lookups.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_LOOKUP',
          errorCode: error.response.status 
        })
      })
  }
}

