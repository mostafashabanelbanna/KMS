import axios from '../../../../../axios'
import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'

// ** Get Unit data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/UnitMeasure/GetUnitMeasuresWithPagination', params).then(response => {
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

// export const getUnitValue = params => {
//   return async (dispatch, getState) => {
//       const indicator = getState().indicators.data.find(ind => ind.id === params)
//       dispatch({type:"GET_UNIT", selectedUnit: params})
//   }
// }

// ** Add new unit
export const addUnit = unit => {
   return (dispatch, getState) => {
    axios
      .post('/UnitMeasure/CreateUnitMeasure', unit)
      .then(response => {
        dispatch({
          type: 'ADD_UNIT',
          unit,
          response:{statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(error => {
        dispatch({
          type: 'ADD_UNIT',
          response:{statusCode: error.response.status, error: error.response, errors:[]},
          errorCode: error.response.status
        })
      })
      .then(() => {
        dispatch(getData(getState().units.params))
      })
  }
}

export const resetCreateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_CREATE_UNIT_RESPONSE"})
  }
}


export const updateUnit = unit => {  
  console.log("unit", unit)

  return async (dispatch, getState) => {
    await axios
     .put('/UnitMeasure/UpdateUnitMeasure/', unit)
     .then(response => {
       dispatch({
         type: 'UPDATE_UNIT',
         response:{statusCode: response.data.statusCode, errors: response.data.errors, error:{}},
         errorCode: 200
       })
     })
   
     .catch(error => {
         dispatch({
             type: 'UPDATE_UNIT',
             response:{error: error.response, errors:[], statusCode: error.response.status },
             errorCode: error.response.status
         })
     })
     .then(() => {
      dispatch(getData(getState().units.params))
    })
 }
}

export const resetUpdateResponse = () => {
  return (dispatch) => {
      dispatch({type: "RESET_UPDATE_UNIT_RESPONSE"})
  }
}


// ** Get Unit
export const getUnit = id => {
  return async dispatch => {
    await axios
      .get(`/UnitMeasure/GetUnitMeasure/${id}`)
      .then(response => {
        console.log("GetUnit", response)
        dispatch({
          type: 'GET_UNIT',
          selectedUnit: response.data.data,
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_UNIT',
          selectedUnit: {},
          errorCode: err.response.status
        })
      })
      
  }
}


// ** Delete Unit
export const deleteUnit = id => {
  console.log(id)
  return (dispatch, getState) => {
    axios
      .delete('/UnitMeasure/DeleteUnitMeasure/', {data: {
        id
      }})
      .then(response => {
        console.log(response)
        dispatch({
          type: 'DELETE_UNIT',
          response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
          errorCode: 200
        })
      })
      .then(() => {
        dispatch(getData(getState().units.params))
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_UNIT',
          errorCode: error.response.status 
        })
      })
  }
}

