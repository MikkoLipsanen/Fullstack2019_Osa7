import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => (
  <div>
    <h2>Users</h2>
    <br/>
    <h3 style={{ textAlign: 'center' }}>blogs created</h3>
    <ul>
      {props.users.map(user =>   
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          <div style={{ textAlign: 'center' }}>{user.blogs.length}</div>
        </li>
      )}
    </ul>
  </div>   
)


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps, 
  null
)(UserList)