import React from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import Blog from './Blog'


const BlogList = (props) => {

  const like = (id) => {
    const liked = props.blogs.find(a => a.id === id)
    props.addLike(liked)
    props.setNotification(`you liked '${liked.title}'`)
  }

  const deleteBlog = (id) => {
    const blog = props.blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blog.title} ${blog.author}`)
    if (ok) {
      props.deleteBlog(id)
      props.setNotification(`${blog.title} ${blog.author} was deleted`)
    }
  }
  

  return(
    props.blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => like(blog.id)}
        remove={() => deleteBlog(blog.id)}
      />
    )
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, {
  setNotification, clearNotification, addLike, deleteBlog
})(BlogList)
    