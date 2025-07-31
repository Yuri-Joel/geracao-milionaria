import type React from "react"
import { Mail, Phone } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

const Contato: React.FC = () => {
    

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
        <div className="pt-24">
            <Header />
            <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6">Entre em Contato</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Estamos aqui para ajudar você a dar o próximo passo em sua jornada de crescimento
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#D10A11] mb-8">Fale Conosco</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-[#D10A11]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">E-mail</h3>
                                        <p className="text-gray-600">geral@geracao-milionaria.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-[#F7B32B]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefone</h3>
                                        <p className="text-gray-600">+244 923 806 943
                                        </p>
                                        <p className="text-gray-600">+244 926 171 604</p>
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

export default Contato