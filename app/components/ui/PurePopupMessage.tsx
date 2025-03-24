import React from 'react';
import Button from '~/components/ui/Button';
import Popup from './Popup';

export interface PurePopupMessageProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const PurePopupMessage: React.FC<PurePopupMessageProps> = ({ message, type, onClose }) => (
  <Popup>
    <div className={`popup-message popup-message--${type}`}>
      {message}
    </div>
    <Button onClick={onClose}>OK</Button>
  </Popup>
);

export default PurePopupMessage;
