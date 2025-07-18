"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Heart, X, Clock, Gift, Users, Target } from "lucide-react"

interface DonationPromptProps {
  triggerMinutes?: number[]
  excludePaths?: string[]
}

interface DonationState {
  hasShown: boolean
  lastShownTime: number
  dismissedForever: boolean
  dismissedUntil: number
  totalTimeSpent: number
}

const DonationPrompt: React.FC<DonationPromptProps> = ({
  triggerMinutes = [1, 5, 10, 15],
  excludePaths = ["/como-doar", "/busca"],
}) => {
  const [showModal, setShowModal] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentTriggerIndex, setCurrentTriggerIndex] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  // Chave para localStorage baseada na sessão
  const STORAGE_KEY = `donation_prompt_${Date.now().toString().slice(0, -7)}`

  // Carregar estado do localStorage
  const loadState = useCallback((): DonationState => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.warn("Erro ao carregar estado da doação:", error)
    }

    return {
      hasShown: false,
      lastShownTime: 0,
      dismissedForever: false,
      dismissedUntil: 0,
      totalTimeSpent: 0,
    }
  }, [STORAGE_KEY])

  // Salvar estado no localStorage
  const saveState = useCallback(
    (state: Partial<DonationState>) => {
      try {
        const currentState = loadState()
        const newState = { ...currentState, ...state }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      } catch (error) {
        console.warn("Erro ao salvar estado da doação:", error)
      }
    },
    [STORAGE_KEY, loadState],
  )

  // Verificar se deve mostrar o modal
  const shouldShowModal = useCallback(() => {
    const state = loadState()
    const currentMinutes = Math.floor(timer / 60)
    const now = Date.now()

    // Não mostrar se foi dispensado para sempre
    if (state.dismissedForever) return false

    // Não mostrar se foi dispensado temporariamente
    if (state.dismissedUntil > now) return false

    // Não mostrar em páginas excluídas
    if (excludePaths.some((path) => location.pathname.startsWith(path))) return false

    // Não mostrar se já está sendo exibido
    if (showModal) return false

    // Verificar se chegou no tempo de trigger
    const shouldTrigger = triggerMinutes.includes(currentMinutes)

    // Não mostrar o mesmo trigger duas vezes
    if (shouldTrigger && state.lastShownTime === currentMinutes) return false

    return shouldTrigger
  }, [timer, location.pathname, excludePaths, triggerMinutes, showModal, loadState])

  // Timer principal
  useEffect(() => {
    // Não contar tempo em páginas excluídas
    if (excludePaths.some((path) => location.pathname.startsWith(path))) {
      return
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev + 1
        // Salvar tempo total gasto
        saveState({ totalTimeSpent: newTime })
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [location.pathname, excludePaths, saveState])

  // Verificar se deve mostrar modal
  useEffect(() => {
    if (shouldShowModal()) {
      const currentMinutes = Math.floor(timer / 60)
      setCurrentTriggerIndex(triggerMinutes.indexOf(currentMinutes))
      setShowModal(true)
      setIsVisible(true)

      // Salvar que foi mostrado neste minuto
      saveState({
        hasShown: true,
        lastShownTime: currentMinutes,
      })
    }
  }, [timer, shouldShowModal, triggerMinutes, saveState])

  // Fechar modal
  const closeModal = useCallback(
    (type: "dismiss" | "later" | "never") => {
      setIsVisible(false)

      // Animação de saída
      setTimeout(() => {
        setShowModal(false)

        const now = Date.now()

        switch (type) {
          case "never":
            saveState({ dismissedForever: true })
            break
          case "later":
            // Não mostrar pelos próximos 30 minutos
            saveState({ dismissedUntil: now + 30 * 60 * 1000 })
            break
          case "dismiss":
            // Não mostrar pelos próximos 10 minutos
            saveState({ dismissedUntil: now + 10 * 60 * 1000 })
            break
        }
      }, 300)
    },
    [saveState],
  )

  // Ir para doação
  const handleDonate = useCallback(() => {
    setIsVisible(false)

    setTimeout(() => {
      setShowModal(false)
      saveState({ dismissedForever: true }) // Não mostrar mais após doação
      navigate("/como-doar")
    }, 300)
  }, [navigate, saveState])

  // Limpar localStorage antigo (opcional)
  useEffect(() => {
    const cleanup = () => {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith("donation_prompt_") && key !== STORAGE_KEY) {
          localStorage.removeItem(key)
        }
      })
    }

    cleanup()
  }, [STORAGE_KEY])

  if (!showModal) return null

  const currentMinutes = Math.floor(timer / 60)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Mensagens dinâmicas baseadas no tempo
  const getMessageData = () => {
    if (currentMinutes >= 15) {
      return {
        title: "Você está realmente engajado! 🎉",
        message:
          "Já passou mais de 15 minutos conosco! Sua dedicação é inspiradora. Que tal nos ajudar a continuar este trabalho?",
        urgency: "high",
        icon: <Target className="w-8 h-8" />,
      }
    } else if (currentMinutes >= 10) {
      return {
        title: "Obrigado por ficar conosco! 💝",
        message: "Você já dedicou 10 minutos do seu tempo para conhecer nosso trabalho. Isso significa muito para nós!",
        urgency: "medium",
        icon: <Users className="w-8 h-8" />,
      }
    } else if (currentMinutes >= 5) {
      return {
        title: "Gostando do que vê? ✨",
        message: "Você está aqui há 5 minutos explorando nossos projetos. Que tal fazer parte desta transformação?",
        urgency: "medium",
        icon: <Gift className="w-8 h-8" />,
      }
    } else {
      return {
        title: "Bem-vindo à nossa causa! 🌟",
        message:
          "Obrigado por conhecer nosso trabalho. Cada doação, por menor que seja, faz a diferença na vida de alguém.",
        urgency: "low",
        icon: <Heart className="w-8 h-8" />,
      }
    }
  }

  const messageData = getMessageData()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-[#D10A11] to-[#b00a10] rounded-t-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  {messageData.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{messageData.title}</h2>
                  <div className="flex items-center space-x-2 text-red-100">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Tempo: {formatTime(timer)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => closeModal("dismiss")}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">{messageData.message}</p>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-[#D10A11]">10K+</div>
              <div className="text-xs text-gray-600">Vidas Impactadas</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <div className="text-2xl font-bold text-[#F7B32B]">50+</div>
              <div className="text-xs text-gray-600">Projetos Ativos</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-[#D10A11]">5</div>
              <div className="text-xs text-gray-600">Anos Transformando</div>
            </div>
          </div>


          {/* Botões de ação */}
          <div className="space-y-3">
            <button
              onClick={handleDonate}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#D10A11] to-[#b00a10] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Fazer Doação Agora</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => closeModal("later")}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Lembrar depois
              </button>
              <button
                onClick={() => closeModal("never")}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Não mostrar mais
              </button>
            </div>
          </div>

          {/* Nota de transparência */}
          <p className="text-xs text-gray-500 text-center mt-4">
            100% das doações vão diretamente para nossos projetos sociais
          </p>
        </div>
      </div>
    </div>
  )
}

export default DonationPrompt
