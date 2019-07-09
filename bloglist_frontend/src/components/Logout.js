import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'

const Logout = (props) => { 

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setNotification(`${props.user.username} logged out`)
    props.logoutUser()
  }

  return(
    <div>
      <p>{props.user.username} logged in</p>
      <button onClick={handleLogout}>logout </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  setNotification,
  logoutUser,
}
  
export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
)(Logout)