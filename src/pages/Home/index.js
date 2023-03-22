import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import DeleteConfirmation from '../../components/DeleteConfirmation';
import Header from '../../components/Header';
import axios from '../../services/axios';
import './home.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [usersIndex, setUsersIndex] = useState(null);

  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/users');
      setUsers(response.data);
    }

    getData();
  }, []);

  const showDeleteModal = (nome, id, index) => {
    setDeleteMessage(`Confirma a exclusão do usuário ${nome}?`);
    setDisplayConfirmationModal(true);
    setUsersIndex(index);
    setIdUser(id);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async (e, id, index) => {
    e.persist();

    try {
      await axios.delete(`/users/${id}`);
      e.currentTarget.parentElement.remove();
      const novosUsers = [...users];
      novosUsers.splice(index, 1);
      setUsers(novosUsers);
      toast.success('Usuário excluido');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  };

  return (
    <>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={idUser} index={usersIndex} message={deleteMessage} />
      <Header />
      <div className="LISTADEUSURIOS_LISTADEUSURIOS">
        <div className="Frame106">
          <div className="Rectangle10">
            <input className="Frame73Pesquisarpornome" type="text" name="text" id="text" placeholder="Pesquisar por nome" />
            <div className="Frame75">
              <span className="Nome">Nome</span>
              <span className="Nome">Telefone</span>
              <span className="Nome">Ações</span>
            </div>
            <div className="Frame94Listadeusurios">
              <span>Lista de usuários</span>
              <a href="/register" className="novo">
                Novo
                <AiOutlinePlus />
              </a>
            </div>
            <div className="Frame87">
              <div className="Frame85">
                <table className="Frame76">
                  {users.map((user, index) => (
                    <tr key={String(user.id)}>
                      <td>{user.nome}</td>
                      <td>{user.telefone}</td>
                      <td>
                        <a href={`/${user.id}/edit`} className="editar">
                          Editar
                        </a>
                        <button type="submit" onClick={() => showDeleteModal(user.nome, user.id, index)} className="deletar">
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
