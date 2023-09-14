import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import {
  actions,
  getUserId,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  updateInfo,
} from "../../../Store/ProfileReducer"
import { sendMessage } from "../../../Store/MessageReducer"
import { Profile } from "./Profile"
import {
  getId,
  getMessagesData,
  getPostData,
  getPostNewText,
  getProfile,
  getStatus,
} from "../../../Store/Selectors"
import {
  MessagesDataType,
  PostDataType,
  profileType,
} from "../../../Types/ReducersTypes"
import { appStateType } from "../../../Store/ReduxStore"
import { withRouter } from "../../HOC/WithRouter"

type mapStateToPropsType = {
  postData: Array<PostDataType>
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
  sendMessage: (userId: number, message: string) => void
  startChatting: (userId: number) => void
}
export type routerType = {
  router: {
    location: {
      hash: string
      key: string
      pathname: string
      search: string
      state: string
    }
    navigate: any
    params: {
      userId: number
    }
  }
}
type ownPropsType = routerType

export type propsType = mapStateToPropsType &
  mapDispatchToPropsType &
  ownPropsType

class ProfileAPI extends React.Component<propsType> {
  componentDidMount() {
    let userId = this.props.router.params.userId
    this.props.getUserId(userId)
    this.props.getUserStatus(userId)
    // this.props.startChatting(userId)
  }

  componentDidUpdate(prevProps: propsType) {
    let userId: any = this.props.router.params.userId
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
        sendMessage={this.props.sendMessage}
      />
    )
  }
}

let mapStateToProps = (state: appStateType) => {
  return {
    postData: getPostData(state),
    postNewText: getPostNewText(state),
    profile: getProfile(state),
    status: getStatus(state),
    selfId: getId(state),
    MessagesData: getMessagesData(state),
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    ...actions,
    getUserId,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    updateInfo,
    sendMessage,
  }),
  withRouter
)(ProfileAPI)
