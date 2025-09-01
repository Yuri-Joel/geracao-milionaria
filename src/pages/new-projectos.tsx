
import { useEffect, useState } from "react"
import { Building2, User, Lock, Megaphone } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LoadingPage } from "../components/Loading"

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"empresa" | "singular" | null>(null)

  const [formData, setFormData] = useState({
    // Step 1 - User data
    nome: "",
    telefone: "",
    confirmaTelefone: "",
    telefoneAlt: "",
    email: "",
    confirmaEmail: "",

    // Step 2 - Company data
    nomeEmpresa: "",
    nif: "",
    setorEconomico: "",
    codigoAlvara: "",
    dataValidadeAlvara: "",
    provincia: "",
    municipio: "",
    bairro: "",
    endereco: "",
    emailEmpresa: "",
    telefoneEmpresa: "",
    tipoPropriedade: "",
    filial: "",
    caixaPostalFilial: "",
    actividadeFilial: "",

    // Step 2 - Personal data
    bi: "",
    dataNascimento: "",
    enderecoPessoal: "",
    cidadePessoal: "",
    profissao: "",
    escolaridade: "",

    // Step 3 - Password
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!formData.telefone.trim()) newErrors.telefone = "Telemóvel é obrigatório"
    if (!formData.confirmaTelefone.trim()) newErrors.confirmaTelefone = "Confirmação de telemóvel é obrigatória"
    if (formData.telefone !== formData.confirmaTelefone) newErrors.confirmaTelefone = "Telemóveis não coincidem"
    if (formData.email && formData.email !== formData.confirmaEmail) newErrors.confirmaEmail = "E-mails não coincidem"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (userType === "empresa") {
      if (!formData.nomeEmpresa.trim()) newErrors.nomeEmpresa = "Nome da empresa é obrigatório"
      if (!formData.nif.trim()) newErrors.nif = "NIF é obrigatório"
      if (!formData.setorEconomico.trim()) newErrors.setorEconomico = "Sector económico é obrigatório"
      if (!formData.codigoAlvara.trim()) newErrors.codigoAlvara = "Código do alvará é obrigatório"
      if (!formData.dataValidadeAlvara.trim()) newErrors.dataValidadeAlvara = "Data de validade do alvará é obrigatória"
      if (!formData.provincia.trim()) newErrors.provincia = "Província é obrigatória"
      if (!formData.municipio.trim()) newErrors.municipio = "Município é obrigatório"
      if (!formData.endereco.trim()) newErrors.endereco = "Endereço é obrigatório"
      if (!formData.emailEmpresa.trim()) newErrors.emailEmpresa = "Email da empresa é obrigatório"
      if (!formData.telefoneEmpresa.trim()) newErrors.telefoneEmpresa = "Telefone da empresa é obrigatório"
    } else {
      if (!formData.bi.trim()) newErrors.bi = "Número do BI é obrigatório"
      if (!formData.dataNascimento.trim()) newErrors.dataNascimento = "Data de nascimento é obrigatória"
      if (!formData.enderecoPessoal.trim()) newErrors.enderecoPessoal = "Endereço é obrigatório"
      if (!formData.cidadePessoal.trim()) newErrors.cidadePessoal = "Cidade é obrigatória"
      if (!formData.profissao.trim()) newErrors.profissao = "Profissão é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password.trim()) newErrors.password = "Palavra-passe é obrigatória"
    if (formData.password.length < 8) newErrors.password = "Palavra-passe deve ter pelo menos 8 caracteres"
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirmação de palavra-passe é obrigatória"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Palavras-passe não coincidem"
    if (!formData.acceptTerms) newErrors.acceptTerms = "Deve aceitar os termos e condições"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleNext = () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = validateStep1()
    } else if (currentStep === 2) {
      isValid = validateStep2()
    } else if (currentStep === 3) {
      isValid = validateStep3()
    }

    if (isValid) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        // Handle form submission
        console.log("Form submitted:", formData)
        alert("Cadastro realizado com sucesso!")
      }
    }
  }

  const steps = [
    { number: 1, title: "Dados Utilizador", icon: User },
    { number: 2, title: "Dados Empresa", icon: Building2 },
    { number: 3, title: "Palavra-Passe", icon: Lock },
  ]

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B32B]/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <Megaphone className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">Empresas</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Parceiros unidos para criar impacto e gerar valor para pessoas e empresas.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                        isActive
                          ? "bg-[#D10A11] text-white"
                          : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div
                      className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        isActive ? "bg-[#D10A11] text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Type Selection */}
          {!userType && (
            <div className="bg-white rounded-lg shadow-md border mb-8">
              <div className="p-6 border-b">
                <h2 className="text-center text-2xl font-semibold text-[#D10A11]">Selecione o Tipo de Cadastro</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    className="h-40 md:h-32 flex flex-col items-center justify-center space-y-3 
    border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 
    transition-colors bg-transparent w-full"
                    onClick={() => setUserType("empresa")}
                  >
                    <Building2 className="w-12 h-12 text-[#D10A11]" />
                    <span className="text-lg font-semibold">Empresa</span>
                  </button>
                  <button
                    className="h-40 md:h-32 flex flex-col items-center justify-center space-y-3 
    border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 
    transition-colors bg-transparent w-full"
                    onClick={() => setUserType("singular")}
                  >
                    <User className="w-12 h-12 text-[#D10A11]" />
                    <span className="text-lg font-semibold">Pessoa Singular</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: User Data */}
          {userType && currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-md border">
              <div className="bg-[#D10A11] text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Dados Utilizador</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                      Nome do responsável *
                    </label>
                    <input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nome ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Digite o nome completo"
                    />
                    {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                      Telemóvel *
                    </label>
                    <input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.telefone ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Digite o número de telemóvel"
                    />
                    {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirma-telefone" className="block text-sm font-medium text-gray-700">
                      Confirmação telemóvel *
                    </label>
                    <input
                      id="confirma-telefone"
                      value={formData.confirmaTelefone}
                      onChange={(e) => handleInputChange("confirmaTelefone", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmaTelefone ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Confirme o número de telemóvel"
                    />
                    {errors.confirmaTelefone && <p className="text-red-500 text-sm">{errors.confirmaTelefone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefone-alt" className="block text-sm font-medium text-gray-700">
                      Telemóvel alternativo (opcional)
                    </label>
                    <input
                      id="telefone-alt"
                      value={formData.telefoneAlt}
                      onChange={(e) => handleInputChange("telefoneAlt", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite o número alternativo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-mail (opcional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite o e-mail"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirma-email" className="block text-sm font-medium text-gray-700">
                      Confirmação e-mail (opcional)
                    </label>
                    <input
                      id="confirma-email"
                      type="email"
                      value={formData.confirmaEmail}
                      onChange={(e) => handleInputChange("confirmaEmail", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmaEmail ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Confirme o e-mail"
                    />
                    {errors.confirmaEmail && <p className="text-red-500 text-sm">{errors.confirmaEmail}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleNext}
                    className="bg-[#D10A11] hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Company Data */}
          {userType && currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-md border">
              <div className="bg-[#D10A11] text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">{userType === "empresa" ? "Dados Empresa" : "Dados Pessoais"}</h2>
              </div>
              <div className="p-6 space-y-6">
                {userType === "empresa" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="nome-empresa" className="block text-sm font-medium text-gray-700">
                        Nome da Empresa *
                      </label>
                      <input
                        id="nome-empresa"
                        value={formData.nomeEmpresa}
                        onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nomeEmpresa ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o nome da empresa"
                      />
                      {errors.nomeEmpresa && <p className="text-red-500 text-sm">{errors.nomeEmpresa}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="setor-economico" className="block text-sm font-medium text-gray-700">
                        Sector Económico *
                      </label>
                      <select
                        id="setor-economico"
                        value={formData.setorEconomico}
                        onChange={(e) => handleInputChange("setorEconomico", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.setorEconomico ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Seleccione opção</option>
                        <option value="primario">Sector Primário (Agricultura, Pecuária e Extracção)</option>
                        <option value="secundario">Sector Secundário (Indústria e Construção)</option>
                        <option value="terciario">Sector Terciário (Serviços)</option>
                      </select>
                      {errors.setorEconomico && <p className="text-red-500 text-sm">{errors.setorEconomico}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
                        NIF *
                      </label>
                      <input
                        id="nif"
                        value={formData.nif}
                        onChange={(e) => handleInputChange("nif", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nif ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o NIF da empresa"
                      />
                      {errors.nif && <p className="text-red-500 text-sm">{errors.nif}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="codigo-alvara" className="block text-sm font-medium text-gray-700">
                        Código do alvará *
                      </label>
                      <input
                        id="codigo-alvara"
                        value={formData.codigoAlvara}
                        onChange={(e) => handleInputChange("codigoAlvara", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.codigoAlvara ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o código do alvará"
                      />
                      {errors.codigoAlvara && <p className="text-red-500 text-sm">{errors.codigoAlvara}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="data-validade-alvara" className="block text-sm font-medium text-gray-700">
                        Data de validade do alvará *
                      </label>
                      <input
                        id="data-validade-alvara"
                        type="date"
                        value={formData.dataValidadeAlvara}
                        onChange={(e) => handleInputChange("dataValidadeAlvara", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dataValidadeAlvara ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.dataValidadeAlvara && <p className="text-red-500 text-sm">{errors.dataValidadeAlvara}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
                        Província *
                      </label>
                      <select
                        id="provincia"
                        value={formData.provincia}
                        onChange={(e) => handleInputChange("provincia", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.provincia ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Seleccione opção</option>
                        <option value="benguela">BENGUELA</option>
                        <option value="luanda">LUANDA</option>
                        <option value="huambo">HUAMBO</option>
                        <option value="lobito">LOBITO</option>
                      </select>
                      {errors.provincia && <p className="text-red-500 text-sm">{errors.provincia}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">
                        Município *
                      </label>
                      <select
                        id="municipio"
                        value={formData.municipio}
                        onChange={(e) => handleInputChange("municipio", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.municipio ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Seleccione opção</option>
                        <option value="balombo">BALOMBO</option>
                        <option value="benguela">BENGUELA</option>
                        <option value="lobito">LOBITO</option>
                      </select>
                      {errors.municipio && <p className="text-red-500 text-sm">{errors.municipio}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
                        Bairro
                      </label>
                      <input
                        id="bairro"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange("bairro", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite o bairro"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                        Endereço *
                      </label>
                      <input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => handleInputChange("endereco", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.endereco ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o endereço"
                      />
                      {errors.endereco && <p className="text-red-500 text-sm">{errors.endereco}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email-empresa" className="block text-sm font-medium text-gray-700">
                        Email da empresa *
                      </label>
                      <input
                        id="email-empresa"
                        type="email"
                        value={formData.emailEmpresa}
                        onChange={(e) => handleInputChange("emailEmpresa", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.emailEmpresa ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o email da empresa"
                      />
                      {errors.emailEmpresa && <p className="text-red-500 text-sm">{errors.emailEmpresa}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="telefone-empresa" className="block text-sm font-medium text-gray-700">
                        Telefone da empresa *
                      </label>
                      <input
                        id="telefone-empresa"
                        value={formData.telefoneEmpresa}
                        onChange={(e) => handleInputChange("telefoneEmpresa", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.telefoneEmpresa ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o telefone da empresa"
                      />
                      {errors.telefoneEmpresa && <p className="text-red-500 text-sm">{errors.telefoneEmpresa}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="tipo-propriedade" className="block text-sm font-medium text-gray-700">
                        Tipo Propriedade
                      </label>
                      <select
                        id="tipo-propriedade"
                        value={formData.tipoPropriedade}
                        onChange={(e) => handleInputChange("tipoPropriedade", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccione opção</option>
                        <option value="privado">Privado</option>
                        <option value="publico">Público</option>
                        <option value="misto">Misto</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="filial" className="block text-sm font-medium text-gray-700">
                        Filial (opcional)
                      </label>
                      <input
                        id="filial"
                        value={formData.filial}
                        onChange={(e) => handleInputChange("filial", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite o nome da filial"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="caixa-postal-filial" className="block text-sm font-medium text-gray-700">
                        Caixa Postal da Filial (opcional)
                      </label>
                      <input
                        id="caixa-postal-filial"
                        value={formData.caixaPostalFilial}
                        onChange={(e) => handleInputChange("caixaPostalFilial", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite a caixa postal"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="actividade-filial" className="block text-sm font-medium text-gray-700">
                        Actividade da Filial (opcional)
                      </label>
                      <input
                        id="actividade-filial"
                        value={formData.actividadeFilial}
                        onChange={(e) => handleInputChange("actividadeFilial", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite a actividade da filial"
                      />
                    </div>


                   
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="bi" className="block text-sm font-medium text-gray-700">
                        Número do BI *
                      </label>
                      <input
                        id="bi"
                        value={formData.bi}
                        onChange={(e) => handleInputChange("bi", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.bi ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o número do BI"
                      />
                      {errors.bi && <p className="text-red-500 text-sm">{errors.bi}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="data-nascimento" className="block text-sm font-medium text-gray-700">
                        Data de Nascimento *
                      </label>
                      <input
                        id="data-nascimento"
                        type="date"
                        value={formData.dataNascimento}
                        onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dataNascimento ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.dataNascimento && <p className="text-red-500 text-sm">{errors.dataNascimento}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="endereco-pessoal" className="block text-sm font-medium text-gray-700">
                        Endereço *
                      </label>
                      <input
                        id="endereco-pessoal"
                        value={formData.enderecoPessoal}
                        onChange={(e) => handleInputChange("enderecoPessoal", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.enderecoPessoal ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite o endereço"
                      />
                      {errors.enderecoPessoal && <p className="text-red-500 text-sm">{errors.enderecoPessoal}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cidade-pessoal" className="block text-sm font-medium text-gray-700">
                        Cidade *
                      </label>
                      <input
                        id="cidade-pessoal"
                        value={formData.cidadePessoal}
                        onChange={(e) => handleInputChange("cidadePessoal", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cidadePessoal ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite a cidade"
                      />
                      {errors.cidadePessoal && <p className="text-red-500 text-sm">{errors.cidadePessoal}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profissao" className="block text-sm font-medium text-gray-700">
                        Profissão *
                      </label>
                      <input
                        id="profissao"
                        value={formData.profissao}
                        onChange={(e) => handleInputChange("profissao", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.profissao ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Digite a profissão"
                      />
                      {errors.profissao && <p className="text-red-500 text-sm">{errors.profissao}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="escolaridade" className="block text-sm font-medium text-gray-700">
                        Escolaridade
                      </label>
                      <input
                        id="escolaridade"
                        value={formData.escolaridade}
                        onChange={(e) => handleInputChange("escolaridade", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite a escolaridade"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#D10A11] hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Password */}
          {userType && currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-md border">
              <div className="bg-[#D10A11] text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Palavra-Passe</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Palavra-passe *
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Digite a palavra-passe"
                    />
                    <p className="text-sm text-gray-600">
                      Mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números
                    </p>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirmar palavra-passe *
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Confirme a palavra-passe"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                    className="w-4 h-4 text-[#D10A11] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Aceito os termos e condições de uso da plataforma *
                  </label>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Finalizar Cadastro
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
