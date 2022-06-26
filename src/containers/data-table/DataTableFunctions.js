import Axios from '../../axios'

// ** Get table Data
 export const getData = async function(url, params) {

    const response = await Axios.post(`${url}`, params)
    return response.data
}
