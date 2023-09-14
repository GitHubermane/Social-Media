import React from "react"
import { getDialogs, sendMessage } from "../../../Store/MessageReducer"
import { Dialogs } from "./Dialogs"
import { connect } from "react-redux"
import { withAuthRedirect } from "../../HOC/AuthRedirect"
import { compose } from "redux"
import {
  MessagesDataType,
  UserMessageDataType,
} from "../../../Types/ReducersTypes"
import { appStateType } from "../../../Store/ReduxStore"

type mapStateToPropsType = {
  UserMessageData: Array<UserMessageDataType>
  messagesData: Array<MessagesDataType>
}
type mapDispatchToPropsType = {
  getDialogs: () => void
  sendMessage: (message: string) => void
}
type propsType = mapStateToPropsType & mapDispatchToPropsType

const DialogsContainer: React.FC<propsType> = (props) => {
  props.getDialogs()
  return <Dialogs sendMessage={props.sendMessage} />
}

export default compose<React.ComponentType>(
  connect(null, { sendMessage, getDialogs }),
  withAuthRedirect
)(DialogsContainer)
