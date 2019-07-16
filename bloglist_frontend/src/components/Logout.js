import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { Redirect } from 'react-router-dom'


const Logout = (props) => { 

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setNotification(`${props.user.username} logged out`)
    props.logoutUser()
  }

  return(
    <div>
      {props.user
        ? 
        <div>
          <br/>
          <em>{props.user.username} logged in</em>
          <br/>
          <br/>
          <button onClick={handleLogout}>logout </button>
        </div>
        : <Redirect to="/login" />
      }
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