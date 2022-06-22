import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { contactsType, profileType } from '../../../Types/ReducersTypes';
//@ts-ignore
import ProfileStyle from './Profile.module.css';

type propsType = {
    profile: profileType
    isOwner: boolean
    updateInfo: (info: any) => void
}
export const ProfileInfo: React.FC<propsType> = ({ profile, ...props }) => {
    let [profileEditMode, setProfileEditMode] = useState(false)
    const activateProfileEditMode = () => {
        setProfileEditMode(true)
    }
    const deactivateProfileEditMode = () => {
        setProfileEditMode(false)
    }
    const onProfileInfoSubmit = (e: Event) => {
        props.updateInfo(e);
        deactivateProfileEditMode()
    }
    return (
        <div>
            {!profileEditMode ?
                <div>
                    <ul className={ProfileStyle.profile__ul}>
                        {profile.aboutMe && <li className={ProfileStyle.profile__li}>About Me: {profile.aboutMe}</li>}
                        {profile.lookingForAJob && <li className={ProfileStyle.profile__li}>Looking for a job: {profile.lookingForAJob}</li>}
                        {profile.lookingForAJob &&
                            <li className={ProfileStyle.profile__li}>Looking for a job description: {profile.lookingForAJobDescription}</li>}
                        <li className={ProfileStyle.profile__li}>Full name: {profile.fullName}</li>
                        <ul>Contacts: {Object.keys(profile.contacts).map((obj) => {
                            return (
                                <li
                                    className={ProfileStyle.profile__li}
                                    key={obj}>
                                    {obj}: {profile.contacts[obj as keyof contactsType] || 'none'}
                                </li>
                            )
                        })}</ul>
                    </ul>
                    <div>
                        {props.isOwner &&
                            <button
                                className={ProfileStyle.profile__btn}
                                onClick={activateProfileEditMode}>
                                Change profile info
                            </button>}
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
                                    <button
                                        className={ProfileStyle.profile__btn}
                                        type='submit'>
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
