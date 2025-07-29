import type React from "react"
import { useState } from "react"
import { Upload, FileText, User, Building, Phone, Mail, Globe } from "lucide-react"
import Footer from "../components/Footer"
import Header from "../components/Header"

export const Inscricao: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    numeroContribuinte: "",
    numeroBilhete: "",
    possuiEmpresa: "",
    nomeEmpresa: "",
    empresaProcesso: "",
    empresaConcluida: "",
    numeroAlvara: "",
    enderecoEmpresa: "",
    municipio: "",
    telefone: "",
    possuiSite: "",
    atividadeEconomica: "",
    tipoSociedade: "",
    setorAtividade: "",
    provincia: "Luanda",
    email: "",
    classificacao: "",
    foto: null as File | null,
    observacoes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      foto: file,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
  
    try {
      const res = await fetch("/send-email.php", {
        method: "POST",
        body: JSON.stringify(formData),
      });
  
      const text = await res.text();
      alert(text);
    } catch (err) {
      alert("Erro ao enviar o formulário.");
      console.error(err);
    }
  };
  
  const provinciasAngola = [
    "Luanda",
    "Bengo",
    "Benguela",
    "Bié",
    "Cabinda",
    "Cuando Cubango",
    "Cuanza Norte",
    "Cuanza Sul",
    "Cunene",
    "Huambo",
    "Huíla",
    "Lunda Norte",
    "Lunda Sul",
    "Malanje",
    "Moxico",
    "Namibe",
    "Uíge",
    "Zaire",
  ]

  const tiposSociedade = [
    "-Nenhuma-",
    "Sociedade Anónima",
    "Sociedade por Quotas",
    "Sociedade Unipessoal por Quotas",
    "Sociedade em Nome Coletivo",
    "Sociedade em Comandita",
    "Empresa Individual",
  ]

  const setoresAtividade = [
    "-Nenhum-",
    "Agricultura e Pecuária",
    "Indústria",
    "Comércio",
    "Serviços",
    "Construção",
    "Tecnologia",
    "Educação",
    "Saúde",
    "Turismo",
    "Transporte",
    "Telecomunicações",
    "Energia",
    "Outros",
  ]

  const classificacoes = [
    "============EMPRESAS=========",
    "Micro Empresa",
    "Pequena Empresa",
    "Média Empresa",
    "Grande Empresa",
    "============OUTROS===========",
    "Pessoa Singular",
    "Estudante",
    "Profissional Liberal",
    "Funcionário Público",
  ]

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
<Header />
      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B32B]/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              FICHA DE ADESÃO A ASSOCIADO DA AGM
            </h1>
            <p className="text-xl opacity-90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Seja um membro da Geração Milionária
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-[#D10A11] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Dados Pessoais</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo do Sócio: *</label>
                    <input
                      type="text"
                      name="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                      required
                      placeholder="Nome completo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de contribuinte: *</label>
                    <input
                      type="text"
                      name="numeroContribuinte"
                      value={formData.numeroContribuinte}
                      onChange={handleInputChange}
                      required
                      placeholder="Preencha seu número de contribuinte"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número do bilhete: *</label>
                    <input
                      type="text"
                      name="numeroBilhete"
                      value={formData.numeroBilhete}
                      onChange={handleInputChange}
                      required
                      placeholder="Preencha seu número do bilhete"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Dados da Empresa */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-[#F7B32B] rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Dados da Empresa</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Possui empresa? (Se sim preencha as informações ao lado)
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="possuiEmpresa"
                          value="Sim"
                          checked={formData.possuiEmpresa === "Sim"}
                          onChange={(e) => handleRadioChange("possuiEmpresa", e.target.value)}
                          className="w-4 h-4 text-[#D10A11] border-gray-300 focus:ring-[#D10A11]"
                        />
                        <span className="ml-2 text-gray-700">Sim</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="possuiEmpresa"
                          value="Não"
                          checked={formData.possuiEmpresa === "Não"}
                          onChange={(e) => handleRadioChange("possuiEmpresa", e.target.value)}
                          className="w-4 h-4 text-[#D10A11] border-gray-300 focus:ring-[#D10A11]"
                        />
                        <span className="ml-2 text-gray-700">Não</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome da empresa:</label>
                    <input
                      type="text"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                      placeholder="Nome da sua empresa"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de sociedade:</label>
                    <select
                      name="tipoSociedade"
                      value={formData.tipoSociedade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    >
                      {tiposSociedade.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Empresa sob processo?</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="empresaProcesso"
                          value="Sim"
                          checked={formData.empresaProcesso === "Sim"}
                          onChange={(e) => handleRadioChange("empresaProcesso", e.target.value)}
                          className="w-4 h-4 text-[#D10A11] border-gray-300 focus:ring-[#D10A11]"
                        />
                        <span className="ml-2 text-gray-700">Sim</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="empresaProcesso"
                          value="Não"
                          checked={formData.empresaProcesso === "Não"}
                          onChange={(e) => handleRadioChange("empresaProcesso", e.target.value)}
                          className="w-4 h-4 text-[#D10A11] border-gray-300 focus:ring-[#D10A11]"
                        />
                        <span className="ml-2 text-gray-700">Não</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Empresa concluída?</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="empresaConcluida"
                          value="Sim"
                          checked={formData.empresaConcluida === "Sim"}
                          onChange={(e) => handleRadioChange("empresaConcluida", e.target.value)}
                          className="w-4 h-4 text-[#D10A11] border-gray-300 focus:ring-[#D10A11]"
                        />
                        <span className="ml-2 text-gray-700">Sim</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="empresaConcluida"
                          value="Não"
                          checked={formData.empresaConcluida === "Não"}
                          onChange={(e) => handleRadioChange("empresaConcluida", e.target.value)}
                          className="w-4 h-4 text-[#D10A11] border-gray-300 focus:ring-[#D10A11]"
                        />
                        <span className="ml-2 text-gray-700">Não</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Setor de atividade:</label>
                    <select
                      name="setorAtividade"
                      value={formData.setorAtividade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    >
                      {setoresAtividade.map((setor) => (
                        <option key={setor} value={setor}>
                          {setor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número do Alvará:</label>
                    <input
                      type="text"
                      name="numeroAlvara"
                      value={formData.numeroAlvara}
                      onChange={handleInputChange}
                      placeholder="Alvará comercial"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço da empresa:</label>
                    <input
                      type="text"
                      name="enderecoEmpresa"
                      value={formData.enderecoEmpresa}
                      onChange={handleInputChange}
                      placeholder="Localização da empresa"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Província:</label>
                    <select
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    >
                      {provinciasAngola.map((provincia) => (
                        <option key={provincia} value={provincia}>
                          {provincia}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dados de Contato */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-[#D10A11] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Dados de Contato</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Município:</label>
                    <input
                      type="text"
                      name="municipio"
                      value={formData.municipio}
                      onChange={handleInputChange}
                      placeholder="Preencha seu município"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone:</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      placeholder="Telefone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email: *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Possui um site?</label>
                    <input
                      type="url"
                      name="possuiSite"
                      value={formData.possuiSite}
                      onChange={handleInputChange}
                      placeholder="Preencha seu website"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Atividade Económica Principal:
                    </label>
                    <input
                      type="text"
                      name="atividadeEconomica"
                      value={formData.atividadeEconomica}
                      onChange={handleInputChange}
                      placeholder="Atividade económica"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Classificação e Anexos */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-[#F7B32B] rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Classificação e Anexos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selecione uma classificação:</label>
                    <select
                      name="classificacao"
                      value={formData.classificacao}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                    >
                      {classificacoes.map((classificacao) => (
                        <option key={classificacao} value={classificacao}>
                          {classificacao}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Anexar uma foto:</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D10A11] file:text-white hover:file:bg-[#b00a10]"
                      />
                      <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {formData.foto && (
                      <p className="text-sm text-green-600 mt-2">Arquivo selecionado: {formData.foto.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações:</label>
                  <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Se tiver alguma informação fora do campo de cadastro pode descrever aqui"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent resize-vertical"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-3 px-12 py-4 bg-gradient-to-r from-[#D10A11] to-[#b00a10] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  <FileText className="w-6 h-6" />
                  <span>Enviar Ficha de Inscrição</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#D10A11] mb-6">Precisa de Ajuda?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Nossa equipe está pronta para ajudá-lo no processo de inscrição
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <Phone className="w-8 h-8 text-[#D10A11] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                <p className="text-gray-600">+244 923 806 943</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <Mail className="w-8 h-8 text-[#F7B32B] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">secretariageral@geracao-milionaria.com</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <Globe className="w-8 h-8 text-[#D10A11] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600">+244 923 806 943</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

