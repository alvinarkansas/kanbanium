import React from 'react';
import { useHistory } from 'react-router-dom';
import logoKanbanium from '../assets/logo-kanbanium.png';
import { useSelector } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';

export default function Nav() {
  const username = localStorage.getItem('name');
  const history = useHistory();
  const loading = useSelector(state => state.loading);

  const signOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <nav>
      <div>
        <img src={logoKanbanium} alt="logo" />
        <BounceLoader
          size={40}
          color={'#089C72'}
          loading={loading}
        />
      </div>
      <div>
        <p>Good day, {username}!</p>
        <p className="txt-logout" onClick={signOut}>Sign Out</p>
      </div>
    </nav>
  )
}
