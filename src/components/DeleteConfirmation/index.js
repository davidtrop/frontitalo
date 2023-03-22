import React from 'react';
import { Modal } from 'react-bootstrap';

import './deleteconfirmation.css';

function DeleteConfirmation({
  showModal, confirmModal, hideModal, id, index, message
}) {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <div className="container">
        <div className="div">
          <div className="alert">{message}</div>
          <div className="td">
            <button type="submit" className="default" onClick={hideModal}>
              Cancelar
            </button>
            <button type="submit" className="danger" onClick={(e) => confirmModal(e, id, index)}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;
