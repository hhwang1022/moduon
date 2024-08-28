import React from 'react';
import './DeleteAccountModal.css';

const DeleteAccountModal = ({ onClose, onConfirm }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>회원 탈퇴</h2>
        <p>정말로 회원 탈퇴를 하시겠습니까?</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button
            className="confirm-button"
            onClick={() => {
              onConfirm();
            }}
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
