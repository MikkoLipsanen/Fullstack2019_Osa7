import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = (props) => {
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      props.setUser(user)
      props.setNotification(`${user.username} logged in`)
    } catch (exception) {
      console.log(exception)
      props.setNotification('Wrong username or password')
    }
    document.getElementById('login_form').reset()
  }

  return(
    <div>
      <h2>Log in to application</h2>
      <form id="login_form" onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input type="text" name='username'/>
        </div>
        <div>
          salasana
          <input type="password" name='password' />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
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
  setUser,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(LoginForm)
    