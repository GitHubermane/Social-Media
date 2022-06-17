import React from 'react';
import { setUserData, getAuth, logout } from '../../Redux/AuthReducer';
import { connect } from 'react-redux';
import { Header } from './Header';
import { compose } from 'redux';


class HeaderContainer extends React.Component {
    render() {

        return (
            <Header {...this.props} />
        )
    }
}


let mapStateToProps = (state) => {

    return {
        id: state.Auth.id,
        email: state.Auth.email,
        loginName: state.Auth.login,
        isAuthorised: state.Auth.isAuthorised,
    }
}

export default compose(
    connect(mapStateToProps, { setUserData, getAuth, logout })
)(HeaderContainer);