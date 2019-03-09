const reducer = (state = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.content
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return state
}
  
export const setNotification = (content) => {
  console.log(content)
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 10000)
  }
}
  
export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)
  
export default reducer