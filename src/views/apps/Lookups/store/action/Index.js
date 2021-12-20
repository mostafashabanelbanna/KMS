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
          type: 'GET_DATA',
          data: response.data.data.items,
          totalPages: response.data.data.totalPages,
          lookupName: params.lookupName,
          params
        })
      }).catch(error => {
        dispatch({
          type: 'GET_DATA',
          data : []
        })
      })
    }
  }

  export const getLookupValue = params => {

  }

  
  export const deleteLookupValue = params => {

}

export const addLookup = Lookup => {  
     console.log(Lookup)

     return async (dispatch, getState) => {
       await axios
        .post('/Lookups/CreateLookupValue', Lookup)
        .then(response => {
          dispatch({
            type: 'ADD_LOOKUP',
            response:{statusCode: response.data.statusCode, errors: response.data.errors}
          })
        })
        .then(() => {
          dispatch(getData(getState().lookups.params))
        })
        .catch(error => {
            dispatch({
                type: 'ADD_LOOKUP',
                createresponse:{error: error.response}
            })
        })
    }
  }

  export const resetResponse = () => {
      return (dispatch) => {
          dispatch({type: "RESET_RESPONSE"})
      }
  }