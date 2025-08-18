import { useEffect, useState } from "react"
import { Building2, User, Lock, Megaphone, } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LoadingPage } from "../components/Loading"

export default function CadastroPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [userType, setUserType] = useState<"empresa" | "singular" | null>(null)

    const steps = [
        { number: 1, title: "Dados Utilizador", icon: User },
        { number: 2, title: "Dados Empresa", icon: Building2 },
        { number: 3, title: "Palavra-Passe", icon: Lock },
    ]

    
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
                                            Nome do responsável
                                        </label>
                                        <input
                                            id="nome"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Digite o nome completo"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                                            Telemóvel
                                        </label>
                                        <input
                                            id="telefone"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Digite o número de telemóvel"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="confirma-telefone" className="block text-sm font-medium text-gray-700">
                                            Confirmação telemóvel
                                        </label>
                                        <input
                                            id="confirma-telefone"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Confirme o número de telemóvel"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="telefone-alt" className="block text-sm font-medium text-gray-700">
                                            Telemóvel alternativo (opcional)
                                        </label>
                                        <input
                                            id="telefone-alt"
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
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Confirme o e-mail"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button
                                        onClick={() => setCurrentStep(2)}
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
                                                Nome da Empresa
                                            </label>
                                            <input
                                                id="nome-empresa"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o nome da empresa"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="nif" className="block text-sm font-medium text-gray-700">
                                                NIF
                                            </label>
                                            <input
                                                id="nif"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o NIF da empresa"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                                                Endereço
                                            </label>
                                            <input
                                                id="endereco"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o endereço"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                                                Cidade
                                            </label>
                                            <input
                                                id="cidade"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite a cidade"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="setor" className="block text-sm font-medium text-gray-700">
                                                Setor de Atividade
                                            </label>
                                            <input
                                                id="setor"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o setor de atividade"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="funcionarios" className="block text-sm font-medium text-gray-700">
                                                Número de Funcionários
                                            </label>
                                            <input
                                                id="funcionarios"
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o número de funcionários"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="bi" className="block text-sm font-medium text-gray-700">
                                                Número do BI
                                            </label>
                                            <input
                                                id="bi"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o número do BI"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="data-nascimento" className="block text-sm font-medium text-gray-700">
                                                Data de Nascimento
                                            </label>
                                            <input
                                                id="data-nascimento"
                                                type="date"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="endereco-pessoal" className="block text-sm font-medium text-gray-700">
                                                Endereço
                                            </label>
                                            <input
                                                id="endereco-pessoal"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite o endereço"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="cidade-pessoal" className="block text-sm font-medium text-gray-700">
                                                Cidade
                                            </label>
                                            <input
                                                id="cidade-pessoal"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite a cidade"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="profissao" className="block text-sm font-medium text-gray-700">
                                                Profissão
                                            </label>
                                            <input
                                                id="profissao"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Digite a profissão"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="escolaridade" className="block text-sm font-medium text-gray-700">
                                                Escolaridade
                                            </label>
                                            <input
                                                id="escolaridade"
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
                                        onClick={() => setCurrentStep(3)}
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
                                            Palavra-passe
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Digite a palavra-passe"
                                        />
                                        <p className="text-sm text-gray-600">
                                            Mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                            Confirmar palavra-passe
                                        </label>
                                        <input
                                            id="confirm-password"
                                            type="password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Confirme a palavra-passe"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="w-4 h-4 text-[#D10A11] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-700">
                                        Aceito os termos e condições de uso da plataforma
                                    </label>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
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
