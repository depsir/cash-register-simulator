import React, {useState} from 'react';
import {useNavigate} from '@remix-run/react';
import Button from '~/components/ui/Button';
import Barcode from 'react-barcode';

interface BarcodeOption {
    label: string;
    value: string;
}

const BARCODE_OPTIONS: BarcodeOption[] = [
    {label: 'Sensor mode on', value: '02311'},
    {label: 'Sensor mode off', value: '02310'},
    {label: 'Continuous scan mode', value: '013304'},
    {label: 'Trigger mode', value: '013300'},
    {label: 'Factory reset', value: '000B0'},
    {label: 'customer sample', value: 'crs-customer-001'},
    {label: 'card sample', value: 'crs-card-001'},
];

export default function TestBarcode() {
    const navigate = useNavigate();
    const [selectedBarcode, setSelectedBarcode] = useState(BARCODE_OPTIONS[0]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = BARCODE_OPTIONS.find((option) => option.value === e.target.value);
        if (selectedOption) {
            setSelectedBarcode(selectedOption);
        }
    };

    return (
        <div className='flex flex-col h-full'>
            <select onChange={handleSelectChange} value={selectedBarcode.value}>
                {BARCODE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <Barcode value={selectedBarcode.value}/>

            <div>
                <Button
                    onClick={() => {
                        navigate('/admin');
                    }}
                    icon='back'
                >
                    indietro
                </Button>
            </div>
        </div>
    );
}