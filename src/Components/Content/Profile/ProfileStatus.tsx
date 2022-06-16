import React, { useEffect, useState } from 'react'
import ProfileStyle from './Profile.module.css';

type propsType = {
  updateUserStatus: (status: string) => void
  status: string 
  isOwner: boolean
}
export const ProfileStatus: React.FC<propsType> = (props) => {
  let [editMode, setEitMode] = useState(false),
    [status, setStatus] = useState(props.status)

  const activate = () => {
    setEitMode(true)
  }
  const deactivate = () => {
    setEitMode(false)
    props.updateUserStatus(status)
  }
  const onStatusChange = (e) => {
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
