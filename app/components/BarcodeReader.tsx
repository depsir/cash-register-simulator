import React, { useState, useEffect } from 'react';
// import BarcodeReader from 'react-barcode-reader';

interface BarcodeReaderProps {
  onBarcodeDetected: (barcode: string) => void;
}

const BarcodeReader: React.FC<BarcodeReaderProps> = ({ onBarcodeDetected }) => {
  const [isScanning, setIsScanning] = useState(false);

  // Temporarily disabled barcode reader
  /*
  useEffect(() => {
    const reader = new BarcodeReader({
      onScan: (data: string) => {
        onBarcodeDetected(data);
      },
      onError: (err: Error) => {
        console.error('Error scanning barcode:', err);
      }
    });

    if (isScanning) {
      reader.start();
    } else {
      reader.stop();
    }

    return () => {
      reader.stop();
    };
  }, [isScanning, onBarcodeDetected]);
  */

  // Temporary manual input for testing
  const handleManualInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      onBarcodeDetected(value);
      event.target.value = ''; // Clear input after detection
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Temporarily disabled button
      <button
        onClick={() => setIsScanning(!isScanning)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      */}
      
      {/* Temporary manual input */}
      <input
        type="text"
        placeholder="Enter barcode manually"
        onChange={handleManualInput}
        className="px-4 py-2 border rounded"
      />
    </div>
  );
};

export default BarcodeReader;