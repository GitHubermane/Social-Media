import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addPost, getUserId,
  getUserStatus, updateUserStatus, savePhoto,
  updateInfo
} from '../../../Redux/ProfileReducer.ts'
import { sendMessage, startChatting } from '../../../Redux/MessageReducer.ts'
import { Profile } from './Profile';
import {
  getId, getMessagesData, getPostData,
  getPostNewText, getProfile, getStatus
} from '../../../Redux/Selectors';
import { MessagesDataType, PostDataType, profileType } from '../../../Types/ReducersTypes';

type mapStateToPropsType = {
  postData: PostDataType
  postNewText: string
  profile: profileType
  status: string
  selfId: number
  MessagesData: MessagesDataType
}
type mapDispatchToPropsType = {
  addPost: (postText: string) => void
  getUserId: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (photo: any) => void
  updateInfo: (profileInfo: profileType) => void
  sendMessage: (message: string) => void
  startChatting: (userId: number) => void
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

class ProfileAPI extends React.Component<propsType> {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    this.props.getUserId(userId)
    this.props.getUserStatus(userId)
    this.props.startChatting(userId)
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
    addPost, getUserId, getUserStatus,
    updateUserStatus, savePhoto, updateInfo,
    sendMessage, startChatting
  }),
  withRouter,
)(ProfileAPI)

