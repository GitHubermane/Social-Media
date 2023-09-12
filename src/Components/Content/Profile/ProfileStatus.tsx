import React, { ChangeEvent, useEffect, useState } from 'react'
//@ts-ignore
import ProfileStyle from './Profile.module.css';

type propsType = {
  updateUserStatus: (status: string) => void
  status: string 
  isOwner: boolean
}
export const ProfileStatus: React.FC<propsType> = (props) => {
  let [editMode, setEditMode] = useState(false),
    [status, setStatus] = useState(props.status)

  const activate = () => {
    setEditMode(true)
  }
  const deactivate = () => {
    setEditMode(false)
    props.updateUserStatus(status)
  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  useEffect(
    () => {setStatus(props.status)},
    [props.status]
  )
  return (
    <div>
      {editMode && props.isOwner ?
        <input
          onChange={onStatusChange}
          type="text"
          onBlur={() => deactivate()}
          value={status}
        /> :
        <div
          className={ProfileStyle.profile__status}
          onDoubleClick={() => activate()}
        >
          {status}
        </div>
      }
    </div>
  )

}
