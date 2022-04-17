import axios from '../../../../../axios'
  import { isLoading, isNotLoading } from '../../../../../redux/actions/layout'


// ** Get Indicator data 
export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    console.log(params)
    await axios.post('/Indicator/GetOldIndicatorsWithPagination', params).then(response => {
      dispatch({
        type: 'GET_OLDINDICATOR_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params,
        response: {statusCode: response.data.statusCode, error: {}, errors: response.data.errors},
        errorCode: 200
      })
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_OLDINDICATOR_DATA',
        data : [],
        errorCode : error.response.status
      })
      dispatch(isNotLoading())

    })
  }
}

