import React from 'react';
import { getDialogs, sendMessage } from '../../../Redux/MessageReducer'
import { Dialogs } from './Dialogs';
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';

class DialogsContainer extends React.Component {
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


let mapStateToProps = (state) => {
  return {
    UserMessageData: state.MessagesPage.UserMessageData,
    messagesData: state.MessagesPage.MessagesData,
  }
}

export default compose(
  connect(mapStateToProps, { sendMessage, getDialogs }),
  withAuthRedirect,
)(DialogsContainer)
