import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'

const App = (props) => {

  const padding = { padding: 5 }
 
  useEffect(() => {
    props.initializeBlogs()
  },[])

  useEffect(() => {
    props.initializeUsers()
  })

  useEffect(() => {
    props.setUser()
  }, [])

  const userById = (id) =>
    props.users.find(user => user.id === id)
  
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <Logout />
            <Notification />
          </div>
          <Route path="/blogs" render={() =>
            props.user ?
              <div>
                <h2>blogs</h2>
                <Togglable buttonLabel="new blog">
                  <BlogForm/>
                </Togglable>
                <ul>
                  <BlogList/>
                </ul>
              </div>
              : <Redirect to="/login" />
          } />
          <Route exact path="/users" render={() => 
            props.user ? <UserList /> : <Redirect to="/login" />
          } />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
          <Route path="/login" render={() =>
            props.user ? <Redirect to="/blogs" /> : <LoginForm /> 
          } />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  setNotification, 
  clearNotification, 
  initializeBlogs, 
  initializeUsers,
  setUser,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App)