import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = (props) => {
 
  useEffect(() => {
    props.initializeBlogs()
  },[])

  useEffect(() => {
    props.setUser()
  }, [])
  
  return (
    <div>
      {props.user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification />
          <Logout />
          <Togglable buttonLabel="new blog">
            <BlogForm/>
          </Togglable>
          <ul>
            <BlogList/>
          </ul>
        </div>
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
  clearNotification, 
  initializeBlogs, 
  setUser,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)