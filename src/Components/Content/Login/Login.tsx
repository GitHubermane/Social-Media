import React from 'react'
import { Field, Form } from 'react-final-form'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { login, getAuth, getCaptcha } from '../../../Redux/AuthReducer.ts'
import { Input } from '../../Commons/CraftForms'
import { required } from '../../Utils/Validators'
import CraftFormsStyle from './../../Commons/CraftForms.module.css'

type propsType = {
  captchaURL: string
  getAuth: () => void
  getCaptcha: () => void
  id: null | number
  isAuthorised: boolean
  login: () => void
}
const Login: React.FC<propsType> = (props) => {
  if (props.isAuthorised) {
    return (
      <Navigate to={`/profile/${props.id}`} />
    )
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm {...props} />
      <div className={CraftFormsStyle.CraftForm__summaryEror}>
      </div>
    </div>
  )
}
const LoginForm = (props) => {
  let onSubmit = (data) => {
    props.getCaptcha()
    props.login(data.Login, data.Password, data.RememberMe, data.Captcha)
  }
  return (
    <Form
      onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="Login"
              component={Input}
              placeholder="Login"
              validate={(required)}
            />
          </div>
          <div>
            <Field
              name="Password"
              component={Input}
              placeholder="Password"
              type='password'
              validate={(required)}
            />
          </div>
          <div>
            <Field
              name="RememberMe"
              component="input"
              type="checkbox"
            />Remember Me
          </div>
          <div>
            <button type='submit'>
              Submit
            </button>
          </div>

          {props.captchaURL &&
            <div>
              <img src={props.captchaURL} alt="" />
              <Field
                name="Captcha"
                component={Input}
                placeholder="Captcha"
                validate={(required)}
              />
            </div>
          }
        </form>
      )}
    </Form>
  )

}

let mapStateToProps = (state) => {
  return {
    id: state.Auth.id,
    isAuthorised: state.Auth.isAuthorised,
    captchaURL: state.Auth.captchaURL
  }
}
export default connect(mapStateToProps, { login, getAuth, getCaptcha })(Login)
