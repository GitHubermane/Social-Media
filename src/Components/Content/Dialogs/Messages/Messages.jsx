import React from 'react'
import MessagesStyle from './Messages.module.css'
export const Messages = (props) => {
  return (
    <div>
      <p className={MessagesStyle.message}>{props.text}</p>
    </div>
  )
}
