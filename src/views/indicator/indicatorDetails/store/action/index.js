import axios from '../../../../../axios'

export const getIndicatorDetails = (id) => {
  console.log('id')

  return async dispatch => {
    await axios.get(`/Indicator/GetIndicator/${id}`)
    .then(response => {
      console.log('then')

        console.log(response)
        dispatch({
          type: 'GET_INDICATOR_DETAILS',
          indicatorDetails: response.data.data
        })
      })
      .catch(error => {
        console.log('catch')
        console.log(error)
        dispatch({
          type: 'GET_INDICATOR_DETAILS',
          indicatorDetails: {}
        })
      })
  }
}