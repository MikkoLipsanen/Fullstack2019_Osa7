import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    const token = action.data.token
    blogService.setToken(token)   
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = await window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    }
  }
}

export const logoutUser = () => {
  console.log('logout')
  return {
    type: 'LOGOUT_USER',
  }
}

export default reducer