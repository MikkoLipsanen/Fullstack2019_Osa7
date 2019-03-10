import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data).sort(byLikes)
  case 'INIT_BLOGS':
    return action.data  
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'LIKE':
    return state
      .map(a => a.id !== action.data.id ? a : action.data)
      .sort(byLikes)
  default:
    return state
  }
}
  
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}
  
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    console.log('uusi', newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}


export const addLike = (blog) => {
  return async (dispatch) => {
    const liked = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(liked)
    dispatch({
      data,
      type: 'LIKE'
    })
  }
}
  
export default reducer