import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import  { useField } from './hooks/index.js'
import { setNotification, clearNotification } from './reducers/notificationReducer'



const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const likes = useField('text')
  const [user, setUser] = useState(null)
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        title.reset()
        author.reset()
        url.reset()
        likes.reset()
        props.setNotification(`A new blog ${returnedBlog.title} by 
        ${returnedBlog.author} added`)
      })
      .catch(error => {
        props.setNotification('Blog creation failed', 'error')
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blog.title} ${blog.author}`)
    if (ok) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          props.setNotification(`${blog.title} ${blog.author} was deleted`)
        })
        .catch(error => {
          props.setNotification('Blog deletion failed', 'error')
        })
    }
  }

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

  const addLike = id => {
    const blog = blogs.find(b => b.id === id)
    
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    blogService
      .update(changedBlog.id, changedBlog).then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const rows = () => [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog.id)}
        remove={() => deleteBlog(blog.id)}
      />
    )
  
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
            <BlogForm
              addBlog={addBlog}
              title={title.propsHook}
              author={author.propsHook}
              url={url.propsHook}
              likes={likes.propsHook}
            />
          </Togglable>
          <ul>
            {rows()}
          </ul>
        </div>
      }
    </div>
  )
}

export default connect(null, { setNotification, clearNotification })(App)