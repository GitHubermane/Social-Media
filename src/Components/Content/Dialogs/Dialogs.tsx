import React from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import { appStateType } from '../../../Redux/ReduxStore';
import { MessagesDataType, UserMessageDataType } from '../../../Types/ReducersTypes';
//@ts-ignore
import DialogsStyle from './Dialogs.module.css';
import { Messages } from './Messages/Messages';
import { Users } from './Users/Users';

type propsType = {
  sendMessage: (message: string) => void
}
export const Dialogs: React.FC<propsType> = (props) => {
  const UserMessageData = useSelector((state: appStateType) => state.MessagesPage.UserMessageData),
  messagesData = useSelector((state: appStateType) => state.MessagesPage.MessagesData)
  
  let UserChatElement = UserMessageData.map(
    dialog => <Users
      id={dialog.id}
      key={dialog.id}
      name={dialog.name} />),
    MessagesElement = messagesData.map(
      message => <Messages
        id={message.id}
        key={message.id}
        text={message.text} />)

  return (
    <div className={DialogsStyle.dialogsBlock}>
      <div className={DialogsStyle.usersBlock}>
        {UserChatElement}
      </div>
      <div className={DialogsStyle.messagesBlock}>
        {MessagesElement}
        <MessageForm {...props} />
      </div>
    </div>
  )
}

export const MessageForm = (props: propsType) => {
  let onSendMessageClick = (messageText: any) => {
    props.sendMessage(messageText.Message)
    messageText.Message = ''
  }
  return (
    <Form
      onSubmit={onSendMessageClick}>
      {({ handleSubmit }) => (
        <form
          className={DialogsStyle.messageInputBlock}
          onSubmit={handleSubmit}>
          <div>
            <Field
              className={DialogsStyle.message__input}
              name="Message"
              component="input"
              placeholder="Enter text"
            />
          </div>
          <button
            className={DialogsStyle.message__button}
            type='submit'>
            <img src="https://www.seekpng.com/png/full/51-512819_png-file-svg-whatsapp-send-icon-png.png" alt="" />
          </button>
        </form>
      )}
    </Form>
  )
}