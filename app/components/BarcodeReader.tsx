import React from "react";
import BarcodeReaderInternal from 'react-barcode-reader'

type Props = {
    onScan: (barcode: string) => void
}
const BarcodeReader:React.FC<Props> = ({onScan}) => {
    return  <BarcodeReaderInternal
        onError={(err: any) => console.error(err)}
        onScan={onScan}
    />
}

export default BarcodeReader;