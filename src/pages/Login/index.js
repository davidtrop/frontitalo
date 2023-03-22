import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import './login.css';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const history = get(props, 'history');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido.');
    }

    if (password.length < 6 || password.length > 20) {
      formErrors = true;
      toast.error(' Senha deve ter entre 6 e 20 caracteres.');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({
      email, password, prevPath, history,
    }));
  };

  return (
    <div className="Login_Login">
      <div className="Frame31">
        <div className="Frame30">
          <span className="LOGIN">LOGIN</span>
        </div>
        <form onSubmit={handleSubmit} className="Frame27">
          <div className="Frame-20">
            <div className="login19">
              <span>Email</span>
              <input type="email" name="email" id="email" placeholder="mail@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login19">
              <span>Senha</span>
              <input type="password" name="password" id="password" placeholder="********************" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="Frame23">
            <div className="Frame22">
              <button className="Frame2" type="submit">
                Entrar
                <svg width="40" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.2688 4.24564L16.0434 0.986951C15.966 0.908835 15.8738 0.846833 15.7722 0.804521C15.6707 0.762209 15.5617 0.740425 15.4517 0.740425C15.3417 0.740425 15.2327 0.762209 15.1312 0.804521C15.0296 0.846833 14.9374 0.908835 14.86 0.986951V0.986951C14.7047 1.1431 14.6176 1.35434 14.6176 1.57452C14.6176 1.79469 14.7047 2.00593 14.86 2.16208L17.827 5.15408H0.833425C0.612387 5.15408 0.400402 5.24188 0.244105 5.39818C0.087807 5.55448 0 5.76646 0 5.9875H0C0 6.20854 0.087807 6.42052 0.244105 6.57682C0.400402 6.73312 0.612387 6.82093 0.833425 6.82093H17.877L14.86 9.82959C14.7819 9.90707 14.7198 9.99924 14.6775 10.1008C14.6352 10.2024 14.6134 10.3113 14.6134 10.4213C14.6134 10.5313 14.6352 10.6403 14.6775 10.7418C14.7198 10.8434 14.7819 10.9356 14.86 11.0131C14.9374 11.0912 15.0296 11.1532 15.1312 11.1955C15.2327 11.2378 15.3417 11.2596 15.4517 11.2596C15.5617 11.2596 15.6707 11.2378 15.7722 11.1955C15.8738 11.1532 15.966 11.0912 16.0434 11.0131L19.2688 7.77936C19.737 7.31056 20 6.67508 20 6.0125C20 5.34993 19.737 4.71445 19.2688 4.24564V4.24564Z" fill="white" />
                </svg>
              </button>
            </div>
            <div className="cadastrar">
              <a href="/register">
                Cadastrar-se
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
