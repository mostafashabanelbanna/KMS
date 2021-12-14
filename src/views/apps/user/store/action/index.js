import axios from '../../../../../axios'

// ** Get users data 
export const getData = params => {
  return async dispatch => {
    await axios.post('/User/GetUsers', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.items,
        totalPages: response.data.data.totalPages,
        params
      })
    }).catch(error => {
      dispatch({
        type: 'GET_DATA',
        data : [],
        error : error.response
      })
    })
  }
}

// ** Add new user
export const addUser = user => {
  console.log(user)
  return (dispatch, getState) => {
    axios
      .post('/User/CreateUser', user)
      .then(response => {
        console.log(response)
        dispatch({
          type: 'ADD_USER',
          user
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        // dispatch(getAllData())
      })
      .catch(err => console.log(err))
  }
}

// ** Get all Data
// export const getAllData = () => {
//   return async dispatch => {
//     await axios.get('/api/users/list/all-data').then(response => {
//       dispatch({
//         type: 'GET_ALL_DATA',
//         data: response.data
//       })
//     })
//   }
// }

// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user
        })
      })
      .catch(err => console.log(err))
  }
}


// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        // dispatch(getAllData())
      })
  }
}
