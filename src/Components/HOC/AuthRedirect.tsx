import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { appStateType } from '../../Redux/ReduxStore'

let mapStateToPropsForRedirect = (state: appStateType) => ({
    isAuthorised: state.Auth.isAuthorised
})

type mapPropsType = {
    isAuthorised: boolean | null
}
export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
    const RedirectComponent: React.FC<mapPropsType> = (props) => {
        let { isAuthorised, ...restProps} = props
        if (props.isAuthorised) {
            return (
                <WrappedComponent {...restProps as WCP} />
            )
        } else {
            return (
                <Navigate to='/login' />
            )
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}