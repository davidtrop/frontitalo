import React from 'react';
import { MdLogout } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';

import './header.css';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/login');
  };

  return (
    <nav>
      <div className="header">
        {isLoggedIn && (
          <a className="user" href="/edit">
            <BiUserCircle size={25} color="#5C73DB" />
          </a>
        )}

        <a onClick={handleLogout} href="/login">
          <MdLogout size={25} color="#5C73DB" />
        </a>

      </div>
    </nav>
  );
}
