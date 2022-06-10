import React from 'react'
import PostsStyle from './Posts.module.css'

export const Posts = (props) => {
  return (
      <div className={PostsStyle.post}>
          <img className={PostsStyle.post__img} src={props.profile.photos.large || "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"} alt="" />
        <div className={PostsStyle.post__content}>
            <p className={PostsStyle.post__text}>
                {props.text}
            </p>
            <div className={PostsStyle.post__likes}>
                Likes: {props.likes}
            </div>
        </div>
      </div>
  )
}