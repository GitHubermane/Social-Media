import React from 'react';
import { logout } from '../../Redux/AuthReducer';
import { connect } from 'react-redux';
import { Header } from './Header';
import { compose } from 'redux';
import { appStateType } from '../../Redux/ReduxStore';


type mapStateToPropsType = {
    loginName: string
    isAuthorised: boolean
}
type mapDispatchToPropsType = {
    logout: () => void
}
type propsType = mapStateToPropsType & mapDispatchToPropsType
class HeaderContainer extends React.Component<propsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}


let mapStateToProps = (state: appStateType) => {
    return {
        loginName: state.Auth.login,
        isAuthorised: state.Auth.isAuthorised,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { logout })
)(HeaderContainer);