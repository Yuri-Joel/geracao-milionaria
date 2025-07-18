import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface DonationPromptProps {
  triggerMinutes?: number[] 
}

const DonationPrompt: React.FC<DonationPromptProps> = ({ triggerMinutes = [1, 5, 10] }) => {
  const [showModal, setShowModal] = useState(false)
  const [timer, setTimer] = useState(0)

  const router = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentMinutes = Math.floor(timer / 60)
    if (triggerMinutes.includes(currentMinutes)) {
      setShowModal(true)
    }
  }, [timer, triggerMinutes])

  const closeModal = () => {
    setShowModal(false)
  }

const handleConfirm = ()=>{
    closeModal();
    router("/como-doar")
}
  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-xl font-bold text-[#D10A11] mb-4">Apoie nossa causa</h2>
        <p className="text-gray-700 mb-6">
          Você está conosco há alguns minutos. Que tal contribuir com uma doação e ajudar a continuar este projeto?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100 transition"
          >
            Agora não
          </button>
          <button
            onClick={()=> handleConfirm()}
            className="px-4 py-2 bg-[#D10A11] text-white rounded hover:bg-[#b00a10] transition"
          >
            Fazer Doação
          </button>
        </div>
      </div>
    </div>
  )
}

export default DonationPrompt
