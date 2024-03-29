import { Component } from "react"
//@ts-ignore
import AppStyle from "./App.module.css"
import { Content } from "./Components/Content/Content"
import { HashRouter } from "react-router-dom"
import HeaderContainer from "./Components/Header/HeaderContainer"
import { initializeApp } from "./Store/AppReducer"
import { connect } from "react-redux"
import { Preloader } from "./Components/Commons/Preloader"
import { appStateType, storeType } from "./Store/ReduxStore"

type propsType = {
  initialized: boolean
  initializeApp: () => void
  store: storeType
}
class App extends Component<propsType> {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <HashRouter>
        <div className={AppStyle.App}>
          <HeaderContainer />
          <Content store={this.props.store} />
        </div>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state: appStateType) => {
  return {
    initialized: state.App.initialized,
  }
}

export default connect(mapStateToProps, { initializeApp })(App)
