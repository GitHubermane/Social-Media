import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addPost, setProfile, getUserId,
  getUserStatus, updateUserStatus, savePhoto,
  updateInfo
} from '../../../Redux/ProfileReducer'
import { sendMessage, showMessages, startChatting } from '../../../Redux/MessageReducer'
import { Profile } from './Profile';
import {
  getId, getMessagesData, getPostData,
  getPostNewText, getProfile, getStatus
} from '../../../Redux/Selectors';


class ProfileAPI extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    this.props.getUserId(userId)
    this.props.getUserStatus(userId)
    this.props.startChatting(userId)
    this.props.showMessages(userId)
  }
  componentDidUpdate(prevProps) {
    let userId = this.props.router.params.userId;
    if (this.props.router.params.userId != prevProps.router.params.userId) {
      this.props.getUserId(userId)
      this.props.getUserStatus(userId)
    }
  }
  render() {
    return (
      <Profile
        {...this.props}
        isOwner={this.props.router.params.userId == this.props.selfId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
        updateInfo={this.props.updateInfo}
        MessagesData={this.props.MessagesData}
        sendMessage={this.props.sendMessage} />
    )
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

let mapStateToProps = (state) => {
  return {
    postData: getPostData(state),
    postNewText: getPostNewText(state),
    profile: getProfile(state),
    status: getStatus(state),
    selfId: getId(state),
    MessagesData: getMessagesData(state)
  }
}

export default compose(
  connect(mapStateToProps, {
    addPost, setProfile, getUserId,
    getUserStatus, updateUserStatus, savePhoto,
    updateInfo, sendMessage, showMessages, startChatting
  }),
  withRouter,
)(ProfileAPI)

