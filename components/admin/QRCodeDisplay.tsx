'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
    productCode: string;
    productName: string;
}

export default function QRCodeDisplay({ productCode, productName }: QRCodeDisplayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/product/${productCode}`;

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(
                canvasRef.current,
                productUrl,
                {
                    width: 300,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF',
                    },
                },
                (error) => {
                    if (error) console.error('QR Code generation error:', error);
                }
            );
        }
    }, [productUrl]);

    const downloadQR = () => {
        if (canvasRef.current) {
            const url = canvasRef.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `QR_${productCode}.png`;
            link.href = url;
            link.click();
        }
    };

    const printQR = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && canvasRef.current) {
            const imageUrl = canvasRef.current.toDataURL('image/png');
            printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>QR Kod - ${productName}</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: Arial, sans-serif;
              }
              .container {
                text-align: center;
                page-break-after: always;
              }
              h1 {
                font-size: 24px;
                margin-bottom: 10px;
              }
              .code {
                font-family: monospace;
                font-size: 18px;
                color: #666;
                margin-bottom: 20px;
              }
              img {
                max-width: 300px;
                border: 2px solid #000;
                padding: 10px;
              }
              @media print {
                body {
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${productName}</h1>
              <div class="code">Ürün Kodu: ${productCode}</div>
              <img src="${imageUrl}" alt="QR Code" />
            </div>
          </body>
        </html>
      `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 text-center">
                <canvas ref={canvasRef} className="mx-auto" />
                <p className="mt-4 text-sm text-gray-600 font-mono break-all">
                    {productUrl}
                </p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={downloadQR}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                    QR Kodu İndir
                </button>
                <button
                    onClick={printQR}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                    QR Kodu Yazdır
                </button>
            </div>
        </div>
    );
}
