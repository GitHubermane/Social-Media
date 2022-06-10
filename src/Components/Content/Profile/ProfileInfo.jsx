import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'

export const ProfileInfo = ({ profile, ...props }) => {
    let [profileEditMode, setProfileEditMode] = useState(false)
    const activateProfileEditMode = () => {
        setProfileEditMode(true)
    }
    const deactivateProfileEditMode = () => {
        setProfileEditMode(false)
    }
    const onProfileInfoSubmit = (e) => {
        console.log(e);
        props.updateInfo(e);
        deactivateProfileEditMode()
    }
    return (
        <div>
            {!profileEditMode ?
                <div>
                    <ul>
                        <li>About Me: {profile.aboutMe || 'none'}</li>
                        <li>Looking for a job: {profile.lookingForAJob}</li>
                        {profile.lookingForAJob &&
                            <li>Looking for a job description: {profile.lookingForAJobDescription}</li>}
                        <li>Full name: {profile.fullName}</li>
                        <ul>Contacts: {Object.keys(profile.contacts).map((obj) => {
                            return (
                                <li
                                    key={obj}>
                                    {obj}: {profile.contacts[obj] || 'none'}
                                </li>
                            )
                        })}</ul>
                    </ul>
                    <div>
                        {props.isOwner &&
                        <button
                            onClick={activateProfileEditMode}>
                            Change profile info
                        </button> }
                    </div>
                </div> :

                <div>
                    <Form
                        onSubmit={onProfileInfoSubmit}>
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Field
                                        name="fullName"
                                        component="input"
                                        placeholder="Enter your Fullname"
                                    />
                                </div>
                                <div>
                                    Looking for a job
                                    <Field
                                        name="lookingForAJob"
                                        component="input"
                                        type="checkbox"
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="lookingForAJobDescription"
                                        component="input"
                                    />
                                </div>
                                <div>
                                    About me
                                    <Field
                                        name="aboutMe"
                                        component="input"
                                    />
                                </div>
                                <ul>
                                    Contacts: {Object.keys(profile.contacts).map((obj) => {
                                        return (
                                            <li>{obj}
                                                <Field
                                                    name={`contacts.${obj}`}
                                                    component="input"
                                                    placeholder={`Enter your ${obj} adress`}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div>
                                    <button type='submit'>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </Form>
                </div>
            }
        </div>
    )
}
