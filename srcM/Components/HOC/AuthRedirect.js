import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

let mapStateToPropsForRedirect = (state) => ({
        isAuthorised: state.Auth.isAuthorised
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuthorised) {
                return (
                    <Component {...this.props} />
                )
            } else {
                return (
                    <Navigate to='/login' />
                )
            }
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}