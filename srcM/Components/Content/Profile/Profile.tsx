import React from 'react';
import { Posts } from './Posts/Posts';
import ProfileStyle from './Profile.module.css';
import { Preloader } from '../../Commons/Preloader'
import { ProfileStatus } from './ProfileStatus';
import { Field, Form } from 'react-final-form';
import { required, maxLengthCreator } from '../../Utils/Validators'
import { Input, TextArea } from '../../Commons/CraftForms';
import { ProfileInfo } from './ProfileInfo';
import { MessagesDataType, PostDataType, profileType } from '../../../Types/ReducersTypes';

type propsType = {
  postData: PostDataType
  postNewText: string
  profile: profileType
  status: string
  selfId: number
  MessagesData: MessagesDataType
  isOwner: boolean
  addPost: (postText: string) => void
  getUserId: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (photo: any) => void
  updateInfo: (profileInfo: profileType) => void
  sendMessage: (userId: number, message: string) => void
  startChatting: (userId: number) => void
}

export const Profile: React.FC<propsType> = (props) => {
  let postElements = props.postData.map(
    post => <Posts
      photo={props.profile?
        props.profile.photos.large:
        "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
      }
      id={post.id}
      key={post.id}
      likes={post.likes}
      text={post.text} />)

  const onPhotoSelect = (e) => {
    props.savePhoto(e.target.files[0]);
  }
  const onSendMessage = (message) => {
    props.sendMessage(props.profile.userId, message)
  }
  if (!props.profile) {
    return (
      <Preloader />
    )
  }
  return (
    <div className={ProfileStyle.profile}>
      <div className={ProfileStyle.profile__body}>
        <div className={ProfileStyle.profile__userBlock}>
          <img
            className={ProfileStyle.profile__img}
            src={!props.profile.photos.large ?
              "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png" :
              props.profile.photos.large
            }/>
          <div className={ProfileStyle.profile__userContent}>
            <h1 className={ProfileStyle.profile__userName}>
              {props.profile.fullName}
            </h1>
            <ProfileStatus
              isOwner={props.isOwner}
              status={props.status}
              updateUserStatus={props.updateUserStatus} />
            <ProfileInfo
              isOwner={props.isOwner}
              profile={props.profile}
              updateInfo={props.updateInfo}
            />

            {/* Временно */}
            {!props.isOwner &&
              <Form
                onSubmit={onSendMessage}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Field
                        name="Message"
                        component={Input}
                        placeholder="Message"
                      />
                    </div>
                    <button type='submit'>
                      Send Message
                    </button>
                  </form>
                )}
              />
            }

          </div>
        </div>
        {props.isOwner &&
          <input
            className={ProfileStyle.photoInput}
            type="file"
            onChange={onPhotoSelect} />}
        {props.isOwner &&
          <div>
            <PostForm {...props} />
          </div>}
        {postElements}
      </div>
    </div>
  )
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const PostForm = (props) => {
  let onSetPostClick = (postText) => {
    props.addPost(postText.Post)
    postText.Post = ''
  }
  return (
    <Form
      onSubmit={onSetPostClick}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="Post"
              component={TextArea}
              placeholder="Post"
              validate={composeValidators(required, maxLengthCreator(10))}
            />
          </div>
          <button
            className={ProfileStyle.profile__btn}
            type='submit'>
            Post
          </button>
        </form>
      )}
    />

  )
}