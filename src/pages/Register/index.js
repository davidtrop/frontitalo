import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import axios from '../../services/axios';
import history from '../../services/history';
import './register.css';

export default function RegisterEdit() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
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
      const reponse = await axios.post('/users/', {
        nome, password, telefone, email,
      });
      toast.success('Cadastro efetuado.');
      history.push('/login');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);
      errors.map((errr) => toast.error(errr));
    }
  }

  return (
    <div className="CRIAREDITARUSURIO_CRIAREDITARUSURIO">
      <form onSubmit={handleSubmit} className="Frame135">
        <div className="Frame134">
          <span className="Usurio">Cadastro de usuário</span>
          <div className="Frame132">
            <div className="Frame91">
              <div className="Frame89">
                <div className="Frame19">
                  <span>Nome</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu Nome"
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
            <button className="Frame2Salvar" type="submit">Criar conta</button>
          </div>
        </div>
      </form>
    </div>
  );
}
