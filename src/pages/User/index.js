import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import axios from '../../services/axios';
import './user.css';
import * as actions from '../../store/modules/auth/actions';

export default function User({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 100) {
      formErrors = true;
      toast.error(' Nome deve ter entre 3 e 100 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error(' Email inválido.');
    }

    if (telefone.length < 8) {
      formErrors = true;
      toast.error(' Telefone deve ter mais de 8 números.');
    }

    if (password.length < 3 || password.length > 100) {
      formErrors = true;
      toast.error(' Senha deve ter entre 6 e 20 caracteres.');
    }

    if (formErrors) return;

    try {
      await axios.put(`/users/${id}`, {
        nome,
        email,
        telefone,
        password,
      });
      toast.success('Usuário editado com sucesso!');
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <div className="CRIAREDITARUSURIO_CRIAREDITARUSURIO">
      <form onSubmit={handleSubmit} className="Frame135">
        <div className="Frame134">
          <span className="Usurio">Editando dados do usuário</span>
          <div className="Frame132">
            <div className="Frame91">
              <div className="Frame89">
                <div className="Frame19">
                  <span>Nome</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                  />
                  <span>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mail@gmail.com"
                  />
                  <span>Telefone</span>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(__)______-____"
                  />
                  <span>Senha</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="****************"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Frame133_1">
          <div className="Frame119">
            <button className="Frame2Salvar" type="submit">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

User.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
