"use client"

import type React from "react"
import { Megaphone, Bell, Calendar, Search, Mail, Phone, MessageCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Comunicado: React.FC = () => {
  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
<Header />      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">COMUNICADOS</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Fique por dentro dos nossos anúncios oficiais e informações importantes
            </p>
          </div>
        </div>
      </section>

      {/* Empty State Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Large Icon */}
            <div className="relative mb-12">
              <div className="w-32 h-32 bg-gradient-to-r from-[#D10A11]/10 to-[#F7B32B]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Bell className="w-16 h-16 text-[#D10A11]/50" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F7B32B] rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">0</span>
              </div>
            </div>

            {/* Main Message */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Nenhum Comunicado Disponível
            </h2>
            <p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              No momento não temos comunicados oficiais para divulgar. Assim que houver novidades importantes, você será
              o primeiro a saber!
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#D10A11] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Notificações Instantâneas</h3>
                <p className="text-gray-600">Receba alertas imediatos sobre comunicados importantes da organização</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#F7B32B] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Atualizações Regulares</h3>
                <p className="text-gray-600">Informações sobre eventos, mudanças e novidades da Geração Milionária</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#D10A11] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fácil Acesso</h3>
                <p className="text-gray-600">Todos os comunicados organizados e facilmente acessíveis em um só lugar</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quer ser notificado?</h3>
              <p className="text-gray-600 mb-6">
                Inscreva-se para receber notificações quando publicarmos novos comunicados
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
                />
                <button className="px-6 py-3 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notificar-me</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">Precisa de Informações?</h2>
              <p className="text-xl text-gray-600">
                Entre em contato conosco para esclarecer dúvidas ou obter informações específicas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-[#D10A11] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Telefone</h3>
                <p className="text-gray-600 mb-4">Ligue para nossa secretaria</p>
                <a
                  href="tel:+244923806943"
                  className="text-[#D10A11] hover:text-[#b00a10] font-semibold transition-colors"
                >
                  +244 923 806 943
                </a>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-[#F7B32B] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Email</h3>
                <p className="text-gray-600 mb-4">Envie sua mensagem</p>
                <a
                  href="mailto:secretariageral@geracao-milionaria.com"
                  className="text-[#F7B32B] hover:text-[#e6a429] font-semibold transition-colors"
                >
                  secretariageral@geracao-milionaria.com
                </a>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Mensagem direta</p>
                <a
                  href="https://wa.me/244923806943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 font-semibold transition-colors"
                >
                  +244 923 806 943
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <Footer />
    </div>
  )
}

export default Comunicado
