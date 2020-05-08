import React from 'react'
import { useLocation } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import WelcomeSign from '../components/WelcomeSign';

export default function Home() {
  const location = useLocation();

  return (
    <div className="page">
      <WelcomeSign />
      <div className="form-container">
        {
          location.pathname === '/'
            ?
            <SignInForm />
            :
            <SignUpForm />
        }
      </div>
    </div>
  )
}
