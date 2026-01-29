
import { useEffect, useRef, useState } from "react"
import { Building2, User, Lock, Megaphone, AlertCircle, CheckCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LoadingPage } from "../components/Loading"
import { submitCadastro, validateStep1, validateStep2, validateStep3, validateField } from "../services/cadastro"
import type { CadastroFormData, ValidationError } from "../services/cadastro"

export default function CadastroPage() {
  const errorSectionRef = useRef<HTMLDivElement>(null)
  const statusMessageRef = useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"empresa" | "singular" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [formData, setFormData] = useState<CadastroFormData>({
    // User Type
    userType: "empresa",

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

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  const validateStep1Local = () => {
    const newErrors = validateStep1(formData)
    setValidationErrors(newErrors)
    const fieldErrorsMap = newErrors.reduce((acc, err) => ({ ...acc, [err.field]: err.message }), {})
    setFieldErrors(fieldErrorsMap)
    return newErrors.every(e => e.type === "warning")
  }

  const validateStep2Local = () => {
    const newErrors = validateStep2(formData, userType)
    setValidationErrors(newErrors)
    const fieldErrorsMap = newErrors.reduce((acc, err) => ({ ...acc, [err.field]: err.message }), {})
    setFieldErrors(fieldErrorsMap)
    return newErrors.every(e => e.type === "warning")
  }

  const validateStep3Local = () => {
    const newErrors = validateStep3(formData)
    setValidationErrors(newErrors)
    const fieldErrorsMap = newErrors.reduce((acc, err) => ({ ...acc, [err.field]: err.message }), {})
    setFieldErrors(fieldErrorsMap)
    return newErrors.every(e => e.type === "warning")
  }

  const getFieldError = (fieldName: string): string => {
    return fieldErrors[fieldName] || ""
  }

  const getFieldErrorType = (fieldName: string): "error" | "warning" | null => {
    const error = validationErrors.find(e => e.field === fieldName)
    return error?.type || null
  }

  const getFieldClassName = (fieldName: string): string => {
    const errorType = getFieldErrorType(fieldName)
    if (errorType === "error") return "border-red-500"
    if (errorType === "warning") return "border-yellow-500"
    return "border-gray-300"
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
      setValidationErrors((prev) => prev.filter(e => e.field !== field))
    }
  }

  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }))
    const err = validateField(field, formData, userType)
    if (err) {
      setFieldErrors(prev => ({ ...prev, [field]: err.message }))
      setValidationErrors(prev => {
        const others = prev.filter(e => e.field !== field)
        return [...others, err]
      })
    } else {
      setFieldErrors(prev => ({ ...prev, [field]: "" }))
      setValidationErrors(prev => prev.filter(e => e.field !== field))
    }
  }

  const fieldToElementId = (field: string) => {
    if (field === "acceptTerms") return "terms"
    if (field === "confirmaTelefone") return "confirma-telefone"
    if (field === "confirmaEmail") return "confirma-email"
    if (field === "nomeEmpresa") return "nome-empresa"
    if (field === "codigoAlvara") return "codigo-alvara"
    if (field === "dataValidadeAlvara") return "data-validade-alvara"
    if (field === "emailEmpresa") return "email-empresa"
    if (field === "telefoneEmpresa") return "telefone-empresa"
    if (field === "enderecoPessoal") return "endereco-pessoal"
    if (field === "cidadePessoal") return "cidade-pessoal"
    if (field === "confirmPassword") return "confirm-password"
    // default camelCase to kebab-case
    return field.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
  }

  const focusFirstError = () => {
    const first = validationErrors.find(e => e.type === "error") || validationErrors[0]
    if (!first) return
    const id = fieldToElementId(first.field)
    const el = document.getElementById(id) as HTMLElement | null
    if (el) {
      el.focus()
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    } else if (errorSectionRef.current) {
      errorSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const handleNext = () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = validateStep1Local()
    } else if (currentStep === 2) {
      isValid = validateStep2Local()
    } else if (currentStep === 3) {
      isValid = validateStep3Local()
    }

    if (isValid) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        // Handle form submission
        handleSubmit()
      }
    } else {
      // Focus and scroll to first invalid field
      focusFirstError()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const dataToSubmit = {
        ...formData,
        userType: userType as "empresa" | "singular",
      };

      const response = await submitCadastro(dataToSubmit);

      setSubmitStatus({
        type: "success",
        message: "Cadastro realizado com sucesso! Bem-vindo à plataforma.",
      });

      // Limpar formulário após sucesso
      setFormData({
        userType: userType as "empresa" | "singular",
        nome: "",
        telefone: "",
        confirmaTelefone: "",
        telefoneAlt: "",
        email: "",
        confirmaEmail: "",
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
        bi: "",
        dataNascimento: "",
        enderecoPessoal: "",
        cidadePessoal: "",
        profissao: "",
        escolaridade: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });

      setUserType(null);
      setCurrentStep(1);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar cadastro";
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
      console.error("Erro ao enviar cadastro:", error);
      // Scroll to error message
      setTimeout(() => {
        if (statusMessageRef.current) {
          statusMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 150);
    } finally {
      setIsSubmitting(false);
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
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${isActive
                        ? "bg-[#D10A11] text-white"
                        : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      {step.number}
                    </div>
                    <div
                      className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${isActive ? "bg-[#D10A11] text-white" : "bg-gray-200 text-gray-700"
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Mensagem de Status */}
          {submitStatus.type && (
            <div
              ref={statusMessageRef}
              className={`mb-8 p-6 rounded-2xl flex items-start space-x-4 ${submitStatus.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
                }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3
                  className={`font-semibold mb-1 ${submitStatus.type === "success"
                    ? "text-green-900"
                    : "text-red-900"
                    }`}
                >
                  {submitStatus.type === "success"
                    ? "Sucesso!"
                    : "Erro no Cadastro"}
                </h3>
                <p
                  className={`text-sm ${submitStatus.type === "success"
                    ? "text-green-700"
                    : "text-red-700"
                    }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            </div>
          )}

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
                    onClick={() => {
                      setUserType("empresa")
                      setFormData(prev => ({ ...prev, userType: "empresa" }))
                    }}
                  >
                    <Building2 className="w-12 h-12 text-[#D10A11]" />
                    <span className="text-lg font-semibold">Empresa</span>
                  </button>
                  <button
                    className="h-40 md:h-32 flex flex-col items-center justify-center space-y-3 
    border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 
    transition-colors bg-transparent w-full"
                    onClick={() => {
                      setUserType("singular")
                      setFormData(prev => ({ ...prev, userType: "singular" }))
                    }}
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
            <div ref={errorSectionRef} className="bg-white rounded-lg shadow-md border">
              {validationErrors.length > 0 && (
                <div className="bg-red-50 border-b border-red-200 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {validationErrors.map((error, idx) => (
                      <div key={idx} className={`flex items-start space-x-2 p-2 rounded ${error.type === "error" ? "bg-red-100/50" : "bg-yellow-100/50"}`}>
                        {error.type === "error" ? (
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${error.type === "error" ? "text-red-800" : "text-yellow-800"}`}>
                            {error.field}: {error.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                      onBlur={() => handleFieldBlur("nome")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("nome")}`}
                      placeholder="Digite o nome completo"
                    />
                    {getFieldError("nome") && <p className={`text-sm ${getFieldErrorType("nome") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("nome")}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                      Telemóvel *
                    </label>
                    <input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      onBlur={() => handleFieldBlur("telefone")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("telefone")}`}
                      placeholder="Digite o número de telemóvel"
                    />
                    {getFieldError("telefone") && <p className={`text-sm ${getFieldErrorType("telefone") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("telefone")}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirma-telefone" className="block text-sm font-medium text-gray-700">
                      Confirmação telemóvel *
                    </label>
                    <input
                      id="confirma-telefone"
                      value={formData.confirmaTelefone}
                      onChange={(e) => handleInputChange("confirmaTelefone", e.target.value)}
                      onBlur={() => handleFieldBlur("confirmaTelefone")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("confirmaTelefone")}`}
                      placeholder="Confirme o número de telemóvel"
                    />
                    {getFieldError("confirmaTelefone") && <p className={`text-sm ${getFieldErrorType("confirmaTelefone") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("confirmaTelefone")}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefone-alt" className="block text-sm font-medium text-gray-700">
                      Telemóvel alternativo (opcional)
                    </label>
                    <input
                      id="telefone-alt"
                      value={formData.telefoneAlt}
                      onChange={(e) => handleInputChange("telefoneAlt", e.target.value)}
                      onBlur={() => handleFieldBlur("telefoneAlt")}
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
                      onBlur={() => handleFieldBlur("email")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("email")}`}
                      placeholder="Digite o e-mail"
                    />
                    {getFieldError("email") && <p className={`text-sm ${getFieldErrorType("email") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("email")}</p>}
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
                      onBlur={() => handleFieldBlur("confirmaEmail")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("confirmaEmail")}`}
                      placeholder="Confirme o e-mail"
                    />
                    {getFieldError("confirmaEmail") && <p className={`text-sm ${getFieldErrorType("confirmaEmail") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("confirmaEmail")}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`bg-[#D10A11] hover:bg-[#b00a10] text-white px-6 py-2 rounded-md font-medium transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {isSubmitting ? "Processando..." : "Próximo"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Company Data */}
          {userType && currentStep === 2 && (
            <div ref={errorSectionRef} className="bg-white rounded-lg shadow-md border">
              {validationErrors.length > 0 && (
                <div className="bg-red-50 border-b border-red-200 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {validationErrors.map((error, idx) => (
                      <div key={idx} className={`flex items-start space-x-2 p-2 rounded ${error.type === "error" ? "bg-red-100/50" : "bg-yellow-100/50"}`}>
                        {error.type === "error" ? (
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${error.type === "error" ? "text-red-800" : "text-yellow-800"}`}>
                            {error.field}: {error.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                        onBlur={() => handleFieldBlur("nomeEmpresa")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Digite o nome da empresa"
                      />

                    </div>

                    <div className="space-y-2">
                      <label htmlFor="setor-economico" className="block text-sm font-medium text-gray-700">
                        Sector Económico *
                      </label>
                      <select
                        id="setor-economico"
                        value={formData.setorEconomico}
                        onChange={(e) => handleInputChange("setorEconomico", e.target.value)}
                        onBlur={() => handleFieldBlur("setorEconomico")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent `}
                      >
                        <option value="">Seleccione opção</option>
                        <option value="primario">Sector Primário (Agricultura, Pecuária e Extracção)</option>
                        <option value="secundario">Sector Secundário (Indústria e Construção)</option>
                        <option value="terciario">Sector Terciário (Serviços)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
                        NIF *
                      </label>
                      <input
                        id="nif"
                        value={formData.nif}
                        onChange={(e) => handleInputChange("nif", e.target.value)}
                        onBlur={() => handleFieldBlur("nif")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Digite o NIF da empresa"
                      />

                    </div>

                    <div className="space-y-2">
                      <label htmlFor="codigo-alvara" className="block text-sm font-medium text-gray-700">
                        Código do alvará *
                      </label>
                      <input
                        id="codigo-alvara"
                        value={formData.codigoAlvara}
                        onChange={(e) => handleInputChange("codigoAlvara", e.target.value)}
                        onBlur={() => handleFieldBlur("codigoAlvara")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("codigoAlvara")}`}
                        placeholder="Digite o código do alvará"
                      />
                      {getFieldError("codigoAlvara") && <p className={`text-sm ${getFieldErrorType("codigoAlvara") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("codigoAlvara")}</p>}
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
                        onBlur={() => handleFieldBlur("dataValidadeAlvara")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("dataValidadeAlvara")}`}
                      />
                      {getFieldError("dataValidadeAlvara") && <p className={`text-sm ${getFieldErrorType("dataValidadeAlvara") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("dataValidadeAlvara")}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
                        Província *
                      </label>
                      <select
                        id="provincia"
                        value={formData.provincia}
                        onChange={(e) => handleInputChange("provincia", e.target.value)}
                        onBlur={() => handleFieldBlur("provincia")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("provincia")}`}
                      >
                        <option value="">Seleccione opção</option>
                        <option value="benguela">BENGUELA</option>
                        <option value="luanda">LUANDA</option>
                        <option value="huambo">HUAMBO</option>
                        <option value="lobito">LOBITO</option>
                      </select>
                      {getFieldError("provincia") && <p className={`text-sm ${getFieldErrorType("provincia") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("provincia")}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">
                        Município *
                      </label>
                      <select
                        id="municipio"
                        value={formData.municipio}
                        onChange={(e) => handleInputChange("municipio", e.target.value)}
                        onBlur={() => handleFieldBlur("municipio")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("municipio")}`}
                      >
                        <option value="">Seleccione opção</option>
                        <option value="balombo">BALOMBO</option>
                        <option value="benguela">BENGUELA</option>
                        <option value="lobito">LOBITO</option>
                      </select>
                      {getFieldError("municipio") && <p className={`text-sm ${getFieldErrorType("municipio") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("municipio")}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
                        Bairro
                      </label>
                      <input
                        id="bairro"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange("bairro", e.target.value)}
                        onBlur={() => handleFieldBlur("bairro")}
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
                        onBlur={() => handleFieldBlur("endereco")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("endereco")}`}
                        placeholder="Digite o endereço"
                      />
                      {getFieldError("endereco") && <p className={`text-sm ${getFieldErrorType("endereco") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("endereco")}</p>}
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
                        onBlur={() => handleFieldBlur("emailEmpresa")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("emailEmpresa")}`}
                        placeholder="Digite o email da empresa"
                      />
                      {getFieldError("emailEmpresa") && <p className={`text-sm ${getFieldErrorType("emailEmpresa") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("emailEmpresa")}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="telefone-empresa" className="block text-sm font-medium text-gray-700">
                        Telefone da empresa *
                      </label>
                      <input
                        id="telefone-empresa"
                        value={formData.telefoneEmpresa}
                        onChange={(e) => handleInputChange("telefoneEmpresa", e.target.value)}
                        onBlur={() => handleFieldBlur("telefoneEmpresa")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("telefoneEmpresa")}`}
                        placeholder="Digite o telefone da empresa"
                      />
                      {getFieldError("telefoneEmpresa") && <p className={`text-sm ${getFieldErrorType("telefoneEmpresa") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("telefoneEmpresa")}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="tipo-propriedade" className="block text-sm font-medium text-gray-700">
                        Tipo Propriedade
                      </label>
                      <select
                        id="tipo-propriedade"
                        value={formData.tipoPropriedade}
                        onChange={(e) => handleInputChange("tipoPropriedade", e.target.value)}
                        onBlur={() => handleFieldBlur("tipoPropriedade")}
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
                        onBlur={() => handleFieldBlur("filial")}
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
                        onBlur={() => handleFieldBlur("caixaPostalFilial")}
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
                        onBlur={() => handleFieldBlur("actividadeFilial")}
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
                        onBlur={() => handleFieldBlur("bi")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("bi")}`}
                        placeholder="Digite o número do BI"
                      />
                      {getFieldError("bi") && <p className={`text-sm ${getFieldErrorType("bi") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("bi")}</p>}
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
                        onBlur={() => handleFieldBlur("dataNascimento")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("dataNascimento")}`}
                      />
                      {getFieldError("dataNascimento") && <p className={`text-sm ${getFieldErrorType("dataNascimento") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("dataNascimento")}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="endereco-pessoal" className="block text-sm font-medium text-gray-700">
                        Endereço *
                      </label>
                      <input
                        id="endereco-pessoal"
                        value={formData.enderecoPessoal}
                        onChange={(e) => handleInputChange("enderecoPessoal", e.target.value)}
                        onBlur={() => handleFieldBlur("enderecoPessoal")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("enderecoPessoal")}`}
                        placeholder="Digite o endereço"
                      />
                      {getFieldError("enderecoPessoal") && <p className={`text-sm ${getFieldErrorType("enderecoPessoal") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("enderecoPessoal")}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cidade-pessoal" className="block text-sm font-medium text-gray-700">
                        Cidade *
                      </label>
                      <input
                        id="cidade-pessoal"
                        value={formData.cidadePessoal}
                        onChange={(e) => handleInputChange("cidadePessoal", e.target.value)}
                        onBlur={() => handleFieldBlur("cidadePessoal")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("cidadePessoal")}`}
                        placeholder="Digite a cidade"
                      />
                      {getFieldError("cidadePessoal") && <p className={`text-sm ${getFieldErrorType("cidadePessoal") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("cidadePessoal")}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="profissao" className="block text-sm font-medium text-gray-700">
                        Profissão *
                      </label>
                      <input
                        id="profissao"
                        value={formData.profissao}
                        onChange={(e) => handleInputChange("profissao", e.target.value)}
                        onBlur={() => handleFieldBlur("profissao")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getFieldClassName("profissao")}`}
                        placeholder="Digite a profissão"
                      />
                      {getFieldError("profissao") && <p className={`text-sm ${getFieldErrorType("profissao") === "error" ? "text-red-500" : "text-yellow-600"}`}>{getFieldError("profissao")}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="escolaridade" className="block text-sm font-medium text-gray-700">
                        Escolaridade
                      </label>
                      <input
                        id="escolaridade"
                        value={formData.escolaridade}
                        onChange={(e) => handleInputChange("escolaridade", e.target.value)}
                        onBlur={() => handleFieldBlur("escolaridade")}
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
                    disabled={isSubmitting}
                    className={`bg-[#D10A11] hover:bg-[#b00a10] text-white px-6 py-2 rounded-md font-medium transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {isSubmitting ? "Processando..." : "Próximo"}
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
                      onBlur={() => handleFieldBlur("password")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Digite a palavra-passe"
                    />
                    <p className="text-sm text-gray-600">
                      Mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números
                    </p>

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
                      onBlur={() => handleFieldBlur("confirmPassword")}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Confirme a palavra-passe"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                    onBlur={() => handleFieldBlur("acceptTerms")}
                    className="w-4 h-4 text-[#D10A11] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Aceito os termos e condições de uso da plataforma *
                  </label>
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {isSubmitting ? "Processando..." : "Finalizar Cadastro"}
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
