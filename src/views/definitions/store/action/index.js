import axios from '../../../../axios'
import { isLoading, isNotLoading } from '../../../../redux/actions/layout'

export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/Definition/GetDefinitionsFront', params).then(response => {
      dispatch({
        type: 'GET_FRONT_DEFINITIONS_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        totalCount: response.data.data.totalCount
      })
      console.log("response", response)
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_DEFINITIONS_DATA',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}

// webResources