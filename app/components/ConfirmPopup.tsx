import React from 'react';
import Popup from './Popup'; // Assuming Popup component is in a separate file
import Button from './Button';

interface ConfirmPopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <Popup>
            <div>{message}</div>
            <div className={'flex'}>
                <Button onClick={onCancel}>Annulla</Button>
                <Button onClick={onConfirm}>OK</Button>
            </div>
        </Popup>
    );
};

export default ConfirmPopup;