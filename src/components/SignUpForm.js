import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import notification from './Notification';
import { SET_LOADING } from '../store/action';
import BounceLoader from 'react-spinners/BounceLoader';
import { useDispatch, useSelector } from 'react-redux';

export default function SignInForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.loading);

  const changeName = (e) => setName(e.target.value)
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  }

  const signUp = (e) => {
    e.preventDefault();
    dispatch(SET_LOADING(true));
    axios.post("https://salty-sierra-49064.herokuapp.com/signup", { name, email, password })
      .then(({ data }) => {
        console.log('new account created = > > > ', data);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('name', data.name);
        history.push('/dashboard');
      })
      .catch(({ response }) => {
        console.log(response, '<<<<');
        if (response.statusText === 'Bad Request') {
          notification('danger', 'Oops', response.data.message);
        }
        if (response.statusText === 'Internal Server Error') {
          response.data.err.errors.map(error => {
            console.log(error.message);
            notification('danger', 'Oops', error.message);
          })
        }
      })
      .finally(_ => {
        dispatch(SET_LOADING(false))
      })
  }

  return (
    <>
      <BounceLoader
        size={75}
        color={'#089C72'}
        loading={loading}
      />
      <h2>Join us</h2>
      <form className="the-form" onSubmit={signUp}>
        <input
          type="text"
          placeholder="name"
          onChange={changeName}
          className="minimal"
        />
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
        <input className="the-btn leaf" type="submit" value="Sign Up" />
        <p>Already a member? Try <Link to="/" className="link" onClick={clearForm}>signing in</Link> instead</p>
      </form>
    </>
  )
}
