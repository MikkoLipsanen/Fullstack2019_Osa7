import React from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  if ( props.blog === undefined) { 
    return null
  }
  
  console.log(props.blog.title)
  const like = () => {
    props.addLike(props.blog)
    props.setNotification(`you liked '${props.blog.title}'`)
  }

  const deleteB = () => {
    const ok = window.confirm(`Remove blog ${props.blog.title} ${props.blog.author}`)
    if (ok) {
      props.deleteBlog(props.blog.id)
      props.setNotification(`${props.blog.title} ${props.blog.author} was deleted`)
    }
  }

  return (
    <div>
      <h2>{props.blog.title}{' '}{props.blog.author}</h2>
      <br/>
      <a href={props.blog.url}>{props.blog.url}</a>
      <br />
      <p>{props.blog.likes} likes</p>
      <button onClick={(event) => {
        event.stopPropagation()
        like()
      }}>like </button>
      <br />
      <p>added by {props.blog.user.name}</p>
      <button onClick={(event) => {
        event.stopPropagation()
        deleteB()
      }}>remove</button>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    blogs: state.blogs,
    blog: props.blog,
  }
}

const mapDispatchToProps = {
  setNotification,
  addLike,
  deleteBlog, 
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Blog)