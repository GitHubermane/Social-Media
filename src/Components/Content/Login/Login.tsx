import React from 'react'
import { Field, Form } from 'react-final-form'
import { Navigate } from 'react-router-dom'
import { Input } from '../../Commons/CraftForms'
import { required } from '../../Utils/Validators'
//@ts-ignore
import CraftFormsStyle from './../../Commons/CraftForms.module.css'

type propsType = {
  isAuthorised: boolean
  id: null | number
  captchaURL: string
  error: null | Array<string>
  getAuth: () => void
  login: (Login: string,
    Password: string,
    RememberMe: boolean,
    Captcha: string) => void
  getCaptcha: () => void
}
export const Login: React.FC<propsType> = (props) => {
  if (props.isAuthorised) {
    return (
      <Navigate to={`/profile/${props.id}`} />
    )
  }
  return (
    <div>
      <h1>Login</h1>
      <div className={CraftFormsStyle.CraftForm__block}>
        <LoginForm {...props} />
        <div className={CraftFormsStyle.CraftForm__info}>
          <div className={CraftFormsStyle.CraftForm__infoTitle}>
            Логин и пароль для гостей
          </div>
          <div className={CraftFormsStyle.CraftForm__infoLogin}>
            Login: free@samuraijs.com
          </div>
          <div className={CraftFormsStyle.CraftForm__infoPassword}>
            Password: free
          </div>
        </div>
      </div>

    </div>
  )
}

type onSubmitDataType = {
  Login: string
  Password: string
  RememberMe: boolean
  Captcha: string
}
const LoginForm = (props: propsType) => {
  let onSubmit = (data: onSubmitDataType) => {
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
          {props.error &&
            <div className={CraftFormsStyle.CraftForm__summaryError}>
              {props.error}
            </div>}
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