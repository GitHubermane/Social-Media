import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { appStateType } from '../../../Redux/ReduxStore';
import { MessagesDataType, UserMessageDataType } from '../../../Types/ReducersTypes';
import { Preloader } from '../../Commons/Preloader';
//@ts-ignore
import DialogsStyle from './Dialogs.module.css';
import { Messages } from './Messages/Messages';
import { Users } from './Users/Users';

type propsType = {
  sendMessage: (message: string) => void
}
type messageType = {
  message: string
  photo: string
  userId: number
  userName: string
}
export const Dialogs: React.FC<propsType> = (props) => {
  const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  const UserMessageData = useSelector((state: appStateType) => state.MessagesPage.UserMessageData),
    messagesData = useSelector((state: appStateType) => state.MessagesPage.MessagesData)

  const [isFetching, setFetching] = useState<boolean>(true)
  const [messages, setMessages] = useState<messageType[]>([]) // Создай и вставь сюда тип

  useEffect(() => {
    setFetching(true)
    ws.addEventListener('message', (e) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
      console.log(JSON.parse(e.data));
      console.log(messages);
    })
    setFetching(false)
  },
    [])
  let MessagesElement = messages.map(
    (message, index) =>
      <div
        className={DialogsStyle.dialogs__messageElem}
        key={index}
      >
        <NavLink to={`/profile/${message.userId}`}>
          <img
            className={DialogsStyle.dialogsImg}
            src={message.photo || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC'} alt=""
          />
        </NavLink>
        <div className={DialogsStyle.dialogs__messageElemBlock}>
          <NavLink
            className={DialogsStyle.dialogs__messageElemLink}
            to={`/profile/${message.userId}`}>
            {message.userName}
          </NavLink>
          {message.message}
        </div>
      </div>)

  return (
    <>
      {isFetching ?
        <Preloader /> :
        <div className={DialogsStyle.dialogsBlock}>
          <div className={DialogsStyle.messagesBlock}>
            {MessagesElement}
          </div>
          <MessageForm {...props} />
        </div>
      }
    </>
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