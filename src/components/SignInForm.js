import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import BounceLoader from 'react-spinners/BounceLoader';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOADING } from '../store/action';
import notification from './Notification';
import GoogleLogin from 'react-google-login';

export default function SignInForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.loading);
  const client_id = "134045794633-fu5sb70f9sp07k27um4r15ikjvdbmucf.apps.googleusercontent.com"

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const signIn = (e) => {
    e.preventDefault();
    dispatch(SET_LOADING(true))
    axios.post("https://salty-sierra-49064.herokuapp.com/signin", { email, password })
      .then(({ data }) => {
        console.log(data, '< < < < < <');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('name', data.name);
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err.response);
        notification('danger', 'Oops!', err.response.data.message);
      })
      .finally(_ => {
        dispatch(SET_LOADING(false))
      })
  }

  const onSignInSuccess = (googleUser) => {
    console.log(googleUser);
    // `googleUser` is the GoogleUser object that represents the just-signed-in user.
    // See https://developers.google.com/identity/sign-in/web/reference#users
    const profile = googleUser.getBasicProfile() // etc etc
    const token = googleUser.getAuthResponse().id_token;
    dispatch(SET_LOADING(true))
    axios({
      method: 'post',
      url: 'https://salty-sierra-49064.herokuapp.com/googleSignIn',
      headers: {
        token
      }
    })
      .then(result => {
        console.log(result);
        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem('name', result.data.name);
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => {
        dispatch(SET_LOADING(false))
      })
  }

  const onSignInError = (error) => {
    // `error` contains any error occurred.
    console.log('OH NOES', error)
  }

  const clearForm = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <BounceLoader
        size={75}
        color={'#089C72'}
        loading={loading}
      />
      <h2>Welcome back</h2>
      <form className="the-form" onSubmit={signIn}>
        <input
          type="email"
          placeholder="email"
          onChange={changeEmail}
          className="minimal"
        />
        <input
          type="password"
          placeholder="password"
          onChange={changePassword}
          className="minimal txt-leaf"
        />
        <input className="the-btn leaf extra-mb" type="submit" value="Sign In" />
        <GoogleLogin
          clientId={client_id}
          buttonText="or sign in with Google"
          onSuccess={onSignInSuccess}
          onFailure={onSignInError}
          cookiePolicy={'single_host_origin'}
        />
        <p>New around here? <Link to="/signup" className="link" onClick={clearForm}>Join us</Link></p>
      </form>
    </>
  )
}
