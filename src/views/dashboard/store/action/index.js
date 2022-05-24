import axios from '../../../../axios'
import { isLoading, isNotLoading } from '../../../../redux/actions/layout'

export const getData = params => {
  console.log(params)
  return async dispatch => {
    dispatch(isLoading())
    await axios.post('/WebResource/GetDashboardsFront', params).then(response => {
      dispatch({
        type: 'GET_FRONT_DASHBOARDS_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        totalCount: response.data.data.totalCount
      })
      console.log("response", response)
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_DASHBOARDS_DATA',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}

export const getDashboardDetailsFront = (id) => {
  return async dispatch => {
    dispatch(isLoading())
    await axios.get(`/WebResource/GetDashboardFront/${id}`).then(response => {
      dispatch({
        type: 'GET_FRONT_DASHBOARDS_DETAILS',
        data: response.data.data
      })
      console.log(response)
      dispatch(isNotLoading())

    }).catch(error => {
      dispatch({
        type: 'GET_FRONT_DASHBOARDS_DETAILS',
        data : []
      })
      dispatch(isNotLoading())
    })
  }
}