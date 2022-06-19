import React from 'react';
import { getDialogs, sendMessage } from '../../../Redux/MessageReducer'
import { Dialogs } from './Dialogs';
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';
import { MessagesDataType, UserMessageDataType } from '../../../Types/ReducersTypes';
import { appStateType } from '../../../Redux/ReduxStore';

type mapStateToPropsType = {
  UserMessageData: UserMessageDataType
  messagesData: MessagesDataType
}
type mapDispatchToPropsType = {
  getDialogs: () => void
  sendMessage: (message: string) => void
}
type propsType = mapStateToPropsType & mapDispatchToPropsType

class DialogsContainer extends React.Component<propsType> {
  componentDidMount() {
    this.props.getDialogs()
  }
  render() {

    return (
      <Dialogs 
        UserMessageData={this.props.UserMessageData}
        messagesData={this.props.messagesData}
        sendMessage={this.props.sendMessage}
        />
    )

  }

}


let mapStateToProps = (state: appStateType) => {
  return {
    UserMessageData: state.MessagesPage.UserMessageData,
    messagesData: state.MessagesPage.MessagesData,
  }
}

export default compose<propsType>(
  connect(mapStateToProps, { sendMessage, getDialogs }),
  withAuthRedirect,
)(DialogsContainer)
