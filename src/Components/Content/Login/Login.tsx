import React from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCaptcha, login } from '../../../Redux/AuthReducer'
import { appStateType } from '../../../Redux/ReduxStore'
import { Input } from '../../Commons/CraftForms'
import { required } from '../../Utils/Validators'
//@ts-ignore
import CraftFormsStyle from './../../Commons/CraftForms.module.css'

type propsType = {}
const Login: React.FC<propsType> = (props) => {
  debugger
  const isAuthorised = useSelector((state: appStateType) => state.Auth.isAuthorised),
    id = useSelector((state: appStateType) =>  state.Auth.id)


  if (isAuthorised) {
    return (
      <Navigate to={`/profile/${id}`} />
    )
  } else {
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
}

type onSubmitDataType = {
  Login: string
  Password: string
  RememberMe: boolean
  Captcha: string
}
const LoginForm = (props: propsType) => {

  const captchaURL = useSelector((state: appStateType) => state.Auth.captchaURL),
    error = useSelector((state: appStateType) => state.Auth.error),
    dispatch = useDispatch()
  let onSubmit = (data: onSubmitDataType) => {
    dispatch(getCaptcha())
    dispatch(login(data.Login, data.Password, data.RememberMe, data.Captcha))
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
          {error &&
            <div className={CraftFormsStyle.CraftForm__summaryError}>
              {error}
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

          {captchaURL &&
            <div>
              <img src={captchaURL} alt="" />
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

export default Login