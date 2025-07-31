import type React from "react"
import { useEffect, useState } from "react"
import {
  Heart,
  Smartphone,
  Building,
  CreditCard,
  Repeat,
  Book,
  Users,
  Award,
  Star,
  Phone,
  Mail,
  Copy,
  Check,
  MessageCircle,
  ArrowRight,
  Shield,
  Target,
} from "lucide-react"
import comoDoarData from "../data/como-doar.json"
import Footer from "../components/Footer"
import Header from "../components/Header"

const ComoDoar: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const [selectedAmount] = useState(10000)
  const [customAmount] = useState("")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    isRecurring: false,
  })
  const [copiedField, setCopiedField] = useState("")

  const getIcon = (iconName: string) => {
    const icons = {
      smartphone: Smartphone,
      building: Building,
      "credit-card": CreditCard,
      repeat: Repeat,
      book: Book,
      users: Users,
      award: Award,
      star: Star,
    }
    return icons[iconName as keyof typeof icons] || Heart
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(""), 2000)
  }

  const handleMCXPayment = () => {
    // Aqui você integrará com a API do MCX Express
    const paymentData = {
      amount: customAmount || selectedAmount,
      currency: "AOA",
      merchantId: comoDoarData.donationMethods.find((m) => m.id === "mcx")?.details.merchantId,
      description: `Doação para Geração Milionária - ${donorInfo.name}`,
      customerInfo: {
        name: donorInfo.name,
        email: donorInfo.email,
        phone: donorInfo.phone,
      },
    }

    console.log("Iniciando pagamento MCX Express:", paymentData)
    // Aqui você chamará a API do MCX Express
    alert("Redirecionando para MCX Express... (Integração pendente)")
  }

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedMethod === "mcx") {
      handleMCXPayment()
    } else {
      console.log("Doação processada:", {
        method: selectedMethod,
        amount: customAmount || selectedAmount,
        donor: donorInfo,
      })
      alert("Obrigado pela sua doação! Entraremos em contato em breve.")
    }
  }

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          {/* Barra no topo */}
          <div className="w-full h-2 bg-[#D10A11] absolute top-0" />
  
          {/* Logo com animação */}
          <img
            src="/assets/2024/07/2-100x100.webp"
            alt="Logo"
            className="w-24 h-24 animate-spin-slow"
          />
        </div>
      );
    }
  
  return (
    <div className="pt-24 bg-gray-50">
      <Header />
      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B32B]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{comoDoarData.hero.title}</h1>
            <h2
              className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {comoDoarData.hero.subtitle}
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {comoDoarData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Levels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#D10A11] mb-4">Seu Impacto</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Veja como sua doação pode transformar vidas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comoDoarData.impactLevels.map((level, index) => {
              const IconComponent = getIcon(level.icon)
              return (
                <div
                  key={level.amount}
                  className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-transparent hover:border-[#D10A11]/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D10A11] to-[#F7B32B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#D10A11] mb-2">{level.amount}kz</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{level.title}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="flex items-center text-[#F7B32B] font-semibold">
                    <Target className="w-4 h-4 mr-2" />
                    {level.impact}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#D10A11] mb-4">Faça sua Doação</h2>
              <p className="text-xl text-gray-600">Escolha o método mais conveniente para você</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Donation Methods */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Métodos de Doação</h3>

                {comoDoarData.donationMethods.map((method) => {
                  const IconComponent = getIcon(method.icon)
                  return (
                    <div
                      key={method.id}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedMethod === method.id
                          ? "border-[#D10A11] bg-red-50"
                          : "border-gray-200 bg-white hover:border-[#D10A11]/50"
                        }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === method.id ? "bg-[#D10A11]" : "bg-gray-100"
                            }`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${selectedMethod === method.id ? "text-white" : "text-gray-600"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{method.name}</h4>
                          <p className="text-gray-600">{method.description}</p>
                        </div>
                      </div>

                      {/* Method Details */}
                      {selectedMethod === method.id && (
                        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">


                          {method.id === "bank" && (
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-gray-600">{method.details.bank}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">IBAN:</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[#D10A11] font-mono">{method.details.iban}</span>
                                  <button
                                    onClick={() => copyToClipboard(method.details.iban as string, "iban")}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    {copiedField === "iban" ? (
                                      <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-gray-600" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {method.id === "mcx" && (
                            <div className="text-center py-4">
                              <div className="flex items-center justify-center space-x-2 text-[#D10A11] mb-2">
                                <Shield className="w-5 h-5" />
                                <span className="font-semibold">Pagamento Seguro</span>
                              </div>
                              <p className="text-sm text-gray-600">Processamento rápido e seguro via MCX Express</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Donation Form */}
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informações da Doação</h3>

                <form onSubmit={handleDonationSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                      <input
                        type="email"
                        required
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                      placeholder="+244 123 456 789"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <label
                      htmlFor="comprovativo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enviar comprovativo (imagem)
                    </label>

                    <label
                      htmlFor="comprovativo"
                      className="cursor-pointer px-4 py-2 bg-blue-800 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
                    >
                      Selecionar imagem
                      <input
                        type="file"
                        id="comprovativo"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            console.log("Arquivo selecionado:", file.name);
                          }
                        }}
                      />
                    </label>

                    <p className="text-xs text-gray-500">
                      Apenas imagens (.jpg, .png, .jpeg). Tamanho máximo recomendado: 5MB.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem (Opcional)</label>
                    <textarea
                      rows={4}
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent resize-vertical"
                      placeholder="Deixe uma mensagem..."
                    />
                  </div>

                  {/* Recurring Donation Option */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={donorInfo.isRecurring}
                      onChange={(e) => setDonorInfo({ ...donorInfo, isRecurring: e.target.checked })}
                      className="w-5 h-5 text-[#D10A11] border-gray-300 rounded focus:ring-[#D10A11]"
                    />
                    <label htmlFor="recurring" className="text-gray-700">
                      Fazer desta uma doação mensal recorrente
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <Heart className="w-6 h-6" />
                    <span>
                      {selectedMethod === "mcx"
                        ? "Pagar com MCX Express"
                        : `Doar`}
                    </span>
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#D10A11] mb-4">{comoDoarData.contact.title}</h2>
              <p className="text-xl text-gray-600">Entre em contato conosco para esclarecer dúvidas sobre doações</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comoDoarData.contact.departments.map((dept, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-3xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{dept.name}</h3>

                  <div className="space-y-4">
                    {dept.phones.map((phone, phoneIndex) => (
                      <div key={phoneIndex} className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#D10A11]" />
                        <a href={`tel:${phone}`} className="text-gray-700 hover:text-[#D10A11] transition-colors">
                          {phone}
                        </a>
                      </div>
                    ))}

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-[#D10A11]" />
                      <a href={`mailto:${dept.email}`} className="text-gray-700 hover:text-[#D10A11] transition-colors">
                        {dept.email}
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <a
                        href={`https://wa.me/${dept.whatsapp.replace(/\s+/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-green-600 transition-colors"
                      >
                        WhatsApp: {dept.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-[#D10A11] to-[#b00a10] p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-semibold mb-6">{comoDoarData.bankingInfo.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Nome:</span>
                    <span className="font-semibold">{comoDoarData.bankingInfo.swift}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="opacity-90">IBAN:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-semibold">{comoDoarData.bankingInfo.iban}</span>
                      <button
                        onClick={() => copyToClipboard(comoDoarData.bankingInfo.iban, "banking-iban")}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        {copiedField === "banking-iban" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-90">Conta:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-semibold">{comoDoarData.bankingInfo.account}</span>
                      <button
                        onClick={() => copyToClipboard(comoDoarData.bankingInfo.account, "banking-account")}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        {copiedField === "banking-account" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#D10A11] mb-4">Depoimentos</h2>
              <p className="text-xl text-gray-600">Veja o impacto das doações na vida das pessoas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comoDoarData.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ComoDoar
