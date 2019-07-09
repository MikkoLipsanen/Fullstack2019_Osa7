import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const BlogForm = (props) => {

  const create = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value ,
      author: event.target.author.value ,
      url: event.target.url.value ,
      likes: event.target.likes.value 
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    event.target.likes.value = ''
    props.createBlog(blogObject)
    props.setNotification(`A new blog ${blogObject.title} by 
    ${blogObject.author} added`)
  }

  return(
    <div>
      <form onSubmit={create}>
        <div>
          title: 
          <input name='title' />
        </div>
        <div> 
          author: 
          <input name='author' />
        </div>
        <div> 
          url: 
          <input name='url' />
        </div>
        <div> 
          likes: 
          <input name='likes'/>
        </div>
        <button>create</button>
      </form>  
    </div>
  )
}

const mapDispatchToProps = {
  createBlog, 
  setNotification, 
  clearNotification,
}
export default connect(
  null,
  mapDispatchToProps  
)(BlogForm)