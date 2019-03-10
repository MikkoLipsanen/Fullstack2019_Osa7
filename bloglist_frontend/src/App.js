import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import  { useField } from './hooks/index.js'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'


const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
 

  useEffect(() => {
    props.initializeBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    const uName = username.value
    const pWord = password.value
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: uName,
        password: pWord,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      props.setNotification(`${user.name} logged in`)
    } catch (exception) {
      props.setNotification('Wrong username or password')
      username.reset()
      password.reset()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setNotification(`${user.name} logged out`)
  }

  
  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username.propsHook}
            password={password.propsHook}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout </button>
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

export default connect(null, { setNotification, clearNotification, initializeBlogs })(App)