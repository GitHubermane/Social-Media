import React from 'react'
//@ts-ignore
import PostsStyle from './Posts.module.css'

type postsPropsType = {
    photo: string | null
    id: number | null
    key: number | null
    likes: number | null
    text: string | null
}
export const Posts: React.FC<postsPropsType> = (props) => {
  return (
      <div className={PostsStyle.post}>
          <img className={PostsStyle.post__img} src={props.photo || "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"} alt="" />
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