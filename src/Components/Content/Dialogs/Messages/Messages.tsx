import React from 'react'
//@ts-ignore
import MessagesStyle from './Messages.module.css'
type propsType = {
  text: string
  id: number
  key: number
}
export const Messages: React.FC<propsType> = (props) => {
  return (
    <div>
      <p className={MessagesStyle.message}>{props.text}</p>
    </div>
  )
}
