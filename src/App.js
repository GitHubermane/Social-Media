import React, { Component } from "react";
import AppStyle from "./App.module.css"
import { Content } from "./Components/Content/Content";
import { HashRouter } from "react-router-dom";
import HeaderContainer from "./Components/Header/HeaderContainer";
import { initializeApp } from "./Redux/AppReducer.ts"
import { connect } from "react-redux";
import { Preloader } from "./Components/Commons/Preloader";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <HashRouter>
        <div className={AppStyle.App}>
          <HeaderContainer />
          <Content
            store={this.props.store}
          />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.App.initialized
  }
} 

export default connect(mapStateToProps, { initializeApp })(App);