import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  console.log(notification)
  if (notification.length === 0) {
    return null
  }
  
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)

