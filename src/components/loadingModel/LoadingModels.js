import React from 'react';
import Modal from 'react-modal';

const LoadingModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: '#ffffffC0', // Adjust opacity here
          zIndex: 50
        },
        content: {
          width: '200px',
          height: '100px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          borderColor: 'rgba(0, 0, 0, 0.0)',
        },
      }}
    > 
      <div className="spinner"></div>
    </Modal>
  );
};

export default LoadingModal;
