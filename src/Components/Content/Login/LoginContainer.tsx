import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { login, getAuth, getCaptcha } from '../../../Redux/AuthReducer'
import { appStateType } from '../../../Redux/ReduxStore'
import { Login } from './Login'

type mapStateToPropsType = {
    captchaURL: string
    id: null | number
    isAuthorised: boolean
    error: null | Array<string>
}

type mapDispatchToPropsType = {
    getAuth: () => void
    getCaptcha: () => void
    login: (Login: string,
        Password: string,
        RememberMe: boolean,
        Captcha: string) => void

}

export type propsType = mapStateToPropsType & mapDispatchToPropsType

export class UsersContainer extends React.Component<propsType> {
    render() {
        return (
            <Login
                id={this.props.id}
                isAuthorised={this.props.isAuthorised}
                captchaURL={this.props.captchaURL}
                error={this.props.error}
                login={this.props.login}
                getAuth={this.props.getAuth}
                getCaptcha={this.props.getCaptcha}
            />
        )
    }
}

let mapStateToProps = (state: appStateType) => {
    return {
        id: state.Auth.id,
        isAuthorised: state.Auth.isAuthorised,
        captchaURL: state.Auth.captchaURL,
        error: state.Auth.error
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, { login, getAuth, getCaptcha })
)(Login)
