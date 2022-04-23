import axios from '../../../../axios'
import { isLoading, isNotLoading } from '../../../../redux/actions/layout'

export const getAllClassifications = () => {
  return async dispatch => {
    await axios.post('/Classification/GetClassifications', {focus: true})
      .then(response => {
        dispatch({
          type: 'GET_CLASSIFICATIONS',
          classifications: response.data.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'GET_CLASSIFICATIONS',
          classifications : []
        })
      })
  }
}

export const getData = params => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/Indicator/GetAdvancedSearchIndicators', params).then(response => {
      dispatch({
        type: 'GET_FRONT_INDICATOR_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        totalCount: response.data.data.totalCount
      })
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_INDICATOR_DATA',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}