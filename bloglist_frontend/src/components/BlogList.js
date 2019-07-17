import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const BlogList = (props) => (
  <div>
    <ul>
      {props.blogs.map(blog =>   
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}{' '}{blog.author}</Link>
        </li>
      )}
    </ul>
  </div>   
)

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogList)