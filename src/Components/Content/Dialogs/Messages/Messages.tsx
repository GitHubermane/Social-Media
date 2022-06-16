import React from 'react'
import MessagesStyle from './Messages.module.css'
type propsType = {
  text: string
}
export const Messages: React.FC<propsType> = (props) => {
  return (
    <div>
      <p className={MessagesStyle.message}>{props.text}</p>
    </div>
  )
}
