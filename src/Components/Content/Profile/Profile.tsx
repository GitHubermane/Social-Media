import React, { ChangeEvent } from 'react';
import { Posts } from './Posts/Posts';
//@ts-ignore
import ProfileStyle from './Profile.module.css';
import { Preloader } from '../../Commons/Preloader'
import { ProfileStatus } from './ProfileStatus';
import { Field, Form } from 'react-final-form';
import { required, maxLengthCreator } from '../../Utils/Validators'
import { Input, TextArea } from '../../Commons/CraftForms';
import { ProfileInfo } from './ProfileInfo';
import { propsType, routerType } from './ProfileContainer';


type profilePropsType = propsType & { isOwner: boolean }
export const Profile: React.FC<profilePropsType> = (props) => {
  let postElements = props.postData.map(
    post => <Posts
      photo={props.profile ?
        props.profile.photos.large :
        "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
      }
      id={post.id}
      key={post.id}
      likes={post.likes}
      text={post.text} />)


  /*   const onPhotoSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      let target: HTMLInputElement| null = e.target
      let file: FileList | null = target.files[0]
      props.savePhoto(file);
    } */

  const onPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      props.savePhoto(e.target.files[0])
    }
  }
  const onSendMessage = (message: string) => {
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
            } />
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

// const composeValidators = (...validators) => (value) =>
//   validators.reduce((error, validator) => error || validator(value), undefined)

const PostForm = (props: propsType) => {
  let onSetPostClick = (postText: { Post: string }) => {
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
              validate={required}
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