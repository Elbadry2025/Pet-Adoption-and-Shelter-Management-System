import React from 'react';

interface Adopter {
  name: string;
  emailAddress: string;
  phoneNumber: string;
}

interface AdopterDetailsModalProps {
  adopter: Adopter;
  onClose: () => void;
}

const AdopterDetailsModal: React.FC<AdopterDetailsModalProps> = ({ adopter, onClose }) => {
  return (
    <div className="smodal">
      <div className="smodal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Adopter Details</h2>
        <p><strong>Name:</strong> {adopter.name}</p>
        <p><strong>Email:</strong> {adopter.emailAddress}</p>
        <p><strong>Phone:</strong> {adopter.phoneNumber}</p>
      </div>
    </div>
  );
};

export default AdopterDetailsModal;
