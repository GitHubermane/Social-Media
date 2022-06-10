import React, { useEffect, useState } from 'react'

export const ProfileStatus = (props) => {
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
          onDoubleClick={() => activate()}
        >
          {status}
        </div>
      }
    </div>
  )

}
