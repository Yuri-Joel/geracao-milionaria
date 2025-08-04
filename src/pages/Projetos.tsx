import type React from "react"
import { Calendar, Users } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import projetos from "../data/projetos.json"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { LoadingPage } from "../components/Loading"

type Projeto = {
  id: number
  title: string
  description: string
  image: string
  status: string
  participants: number
  startDate: string
}

const Projetos: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800"
      case "Concluído":
        return "bg-[#F7B32B] bg-opacity-20 text-[#F7B32B]"
      case "Em Breve":
        return "bg-[#D10A11] bg-opacity-20 text-[#D10A11]"
      case "Planejamento":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
    <div className="pt-24">
      <Header />

      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6">Nossos Projetos</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça os programas e iniciativas que estão transformando vidas e criando oportunidades
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(projetos as Projeto[]).map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={projeto.image}
                  alt={projeto.title}
                  className="w-full aspect-square object-cover object-center rounded-t-xl"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(projeto.status)}`}>
                      {projeto.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{projeto.title}</h3>

                  <p className="text-gray-600 mb-4">{projeto.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{projeto.participants} participantes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(projeto.startDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>

                
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-6">Quer participar de nossos projetos?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Entre em contato conosco e descubra como você pode fazer parte das nossas iniciativas
            </p>
            <Link to={"/contacto"} className="inline-flex items-center px-8 py-4 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-lg transition-colors duration-200">
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Projetos
