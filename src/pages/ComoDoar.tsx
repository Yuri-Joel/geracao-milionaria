import type React from "react"
import { useEffect, useRef, useState } from "react"
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
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import comoDoarData from "../data/como-doar.json"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { LoadingPage } from "../components/Loading"
import { submitDoacao, validateDoacaoForm, type ValidationError } from "../services/doacao"

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
  const [comprovativo, setComprovativo] = useState<File | null>(null);
  const [copiedField, setCopiedField] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, ValidationError>>({});
  const errorSectionRef = useRef<HTMLDivElement>(null);
  const statusMessageRef = useRef<HTMLDivElement>(null);

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

  const getFieldError = (fieldName: string): ValidationError | null => {
    return fieldErrors[fieldName] || null;
  };

  const getFieldClassName = (fieldName: string, baseClass: string): string => {
    const error = getFieldError(fieldName);
    if (!error) return baseClass;

    if (error.type === "error") {
      return `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500`;
    } else if (error.type === "warning") {
      return `${baseClass} border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500`;
    }
    return baseClass;
  };

  const handleInputChange = (fieldName: string, value: string) => {
    if (fieldName === "name") {
      setDonorInfo({ ...donorInfo, name: value });
    } else if (fieldName === "email") {
      setDonorInfo({ ...donorInfo, email: value });
    } else if (fieldName === "phone") {
      setDonorInfo({ ...donorInfo, phone: value });
    } else if (fieldName === "message") {
      setDonorInfo({ ...donorInfo, message: value });
    }

    // Limpar erro do campo ao usuário começar a digitar
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpar erros anteriores
    setValidationErrors([]);
    setFieldErrors({});
    setSubmitStatus({ type: null, message: "" });

    // Validar formulário
    const errors = validateDoacaoForm({
      ...donorInfo,
      method: selectedMethod,
      comprovativo,
    });

    if (errors.length > 0) {
      setValidationErrors(errors);

      // Criar mapa de erros por campo
      const errorMap: Record<string, ValidationError> = {};
      errors.forEach(error => {
        if (!errorMap[error.field]) {
          errorMap[error.field] = error;
        }
      });
      setFieldErrors(errorMap);

      setSubmitStatus({
        type: "error",
        message: "Por favor, corrija os erros abaixo",
      });

      // Scroll para a seção de erros
      if (errorSectionRef.current) {
        errorSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitDoacao({
        ...donorInfo,
        method: selectedMethod,
        comprovativo,
      });

      setSubmitStatus({
        type: "success",
        message: "Doação registrada com sucesso! Obrigado pela sua generosidade.",
      });

      // Limpar formulário após sucesso
      setDonorInfo({
        name: "",
        email: "",
        phone: "",
        message: "",
        isRecurring: false,
      });
      setComprovativo(null);

      // Rolar para o topo da página
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar doação";
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
      console.error("Erro ao enviar doação:", error);

      // Scroll para a mensagem de erro após submissão
      setTimeout(() => {
        if (statusMessageRef.current) {
          statusMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingPage />
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
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Donation Form */}
              <div className="bg-white p-8 rounded-3xl shadow-lg" ref={errorSectionRef}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informações da Doação</h3>

                {/* Mensagem de Status */}
                {submitStatus.type && (
                  <div
                    ref={statusMessageRef}
                    className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                      }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4
                        className={`font-semibold text-sm ${submitStatus.type === "success"
                          ? "text-green-900"
                          : "text-red-900"
                          }`}
                      >
                        {submitStatus.type === "success"
                          ? "Sucesso!"
                          : "Erro na Doação"}
                      </h4>
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

                {/* Erros de Validação */}
                {validationErrors.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-900 text-sm mb-3">
                          Por favor, corrija os seguintes erros:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {validationErrors.map((error, index) => (
                            <div
                              key={index}
                              className={`text-sm p-2 rounded flex items-start space-x-2 ${error.type === "error"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                              <span className="text-lg leading-none">•</span>
                              <div>
                                <span className="font-medium">{error.field}:</span>{" "}
                                {error.message}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleDonationSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={donorInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={getFieldClassName(
                          "name",
                          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent transition-colors"
                        )}
                        placeholder="Seu nome completo"
                      />
                      {getFieldError("name") && (
                        <div className={`mt-2 text-sm flex items-start space-x-2 ${getFieldError("name")?.type === "error" ? "text-red-600" : "text-yellow-600"
                          }`}>
                          <span>•</span>
                          <span>{getFieldError("name")?.message}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                      <input
                        type="email"
                        required
                        value={donorInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={getFieldClassName(
                          "email",
                          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent transition-colors"
                        )}
                        placeholder="seu@email.com"
                      />
                      {getFieldError("email") && (
                        <div className={`mt-2 text-sm flex items-start space-x-2 ${getFieldError("email")?.type === "error" ? "text-red-600" : "text-yellow-600"
                          }`}>
                          <span>•</span>
                          <span>{getFieldError("email")?.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={getFieldClassName(
                        "phone",
                        "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent transition-colors"
                      )}
                      placeholder="+244 923 456 789"
                    />
                    {getFieldError("phone") && (
                      <div className={`mt-2 text-sm flex items-start space-x-2 ${getFieldError("phone")?.type === "error" ? "text-red-600" : "text-yellow-600"
                        }`}>
                        <span>•</span>
                        <span>{getFieldError("phone")?.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <label
                      htmlFor="comprovativo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enviar comprovativo (imagem) *
                    </label>

                    <label
                      htmlFor="comprovativo"
                      className={`cursor-pointer px-4 py-2 bg-blue-800 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-300 text-sm font-medium ${getFieldError("comprovativo") ? "border-2 border-red-500" : ""
                        }`}
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
                            setComprovativo(file);
                            // Limpar erro do campo
                            if (fieldErrors.comprovativo) {
                              setFieldErrors(prev => {
                                const updated = { ...prev };
                                delete updated.comprovativo;
                                return updated;
                              });
                            }
                          }
                        }}
                      />
                    </label>

                    {comprovativo && (
                      <p className="text-sm text-green-600">
                        ✓ Arquivo selecionado: {comprovativo.name}
                      </p>
                    )}

                    {getFieldError("comprovativo") && (
                      <div className={`text-sm flex items-start space-x-2 ${getFieldError("comprovativo")?.type === "error" ? "text-red-600" : "text-yellow-600"
                        }`}>
                        <span>•</span>
                        <span>{getFieldError("comprovativo")?.message}</span>
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      Apenas imagens (.jpg, .png, .jpeg, .webp). Tamanho máximo: 5MB.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem (Opcional)</label>
                    <textarea
                      rows={4}
                      value={donorInfo.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={getFieldClassName(
                        "message",
                        "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent resize-vertical transition-colors"
                      )}
                      placeholder="Deixe uma mensagem inspiradora..."
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{donorInfo.message.length}/500 caracteres</span>
                      {getFieldError("message") && (
                        <div className={`text-sm flex items-start space-x-2 ${getFieldError("message")?.type === "error" ? "text-red-600" : "text-yellow-600"
                          }`}>
                          <span>•</span>
                          <span>{getFieldError("message")?.message}</span>
                        </div>
                      )}
                    </div>
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
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-3 px-8 py-4 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSubmitting
                      ? "opacity-70 cursor-not-allowed hover:scale-100"
                      : "hover:shadow-lg hover:scale-105"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-6 h-6" />
                        <span>
                          {selectedMethod === "mcx"
                            ? "Pagar com MCX Express"
                            : `Fazer Doação`}
                        </span>
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
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
                  <div className="flex gap-4">
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
      <Footer />
    </div>
  )
}

export default ComoDoar
