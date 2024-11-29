'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import Image from 'next/image'

interface QRCodeGeneratorProps {
  villaparada: number
  id_fruta: number
}

export default function QRCodeGenerator({ villaparada, id_fruta }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = `https://landing.heladosvillaizan.tech/sabores?villaparada=${villaparada}&id_fruta=${id_fruta}`
        const qrCodeDataUrl = await QRCode.toDataURL(url)
        setQrCodeUrl(qrCodeDataUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQRCode()
  }, [villaparada, id_fruta])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qr-villaparada-${villaparada}-fruta-${id_fruta}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!qrCodeUrl) {
    return <div>Generando código QR...</div>
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <Image src={qrCodeUrl} alt="QR Code" width={250} height={250} />
      <button
        onClick={handleDownload}
        className="mt-4 flex w-full transform items-center justify-center space-x-2 rounded-lg bg-red-700 py-3 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Descargar QR
      </button>
    </div>
  )
}

