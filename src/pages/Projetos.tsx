import type React from "react"
import { ExternalLink, Calendar, Users } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Projetos: React.FC = () => {
  const projetos = [
    {
      id: 1,
      title: "Programa de Capacitação Digital",
      description: "Curso completo de habilidades digitais para o mercado de trabalho moderno.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Ativo",
      participants: 500,
      startDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Mentoria Empresarial",
      description: "Programa de mentoria para empreendedores e líderes empresariais.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Ativo",
      participants: 150,
      startDate: "2024-02-01",
    },
    {
      id: 3,
      title: "Workshop de Desenvolvimento Pessoal",
      description: "Série de workshops focados em crescimento pessoal e profissional.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Concluído",
      participants: 800,
      startDate: "2023-10-01",
    },
    {
      id: 4,
      title: "Programa de Inclusão Social",
      description: "Iniciativa para inclusão de jovens em situação de vulnerabilidade.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Ativo",
      participants: 200,
      startDate: "2024-03-01",
    },
    {
      id: 5,
      title: "Curso de Liderança",
      description: "Desenvolvimento de habilidades de liderança para gestores.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Em Breve",
      participants: 0,
      startDate: "2024-06-01",
    },
    {
      id: 6,
      title: "Programa de Inovação",
      description: "Fomento à inovação e criatividade no ambiente corporativo.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Planejamento",
      participants: 0,
      startDate: "2024-08-01",
    },
  ]

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

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={projeto.image || "/placeholder.svg"}
                  alt={projeto.title}
                  className="w-full h-48 object-cover rounded-t-xl"
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

                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#D10A11] hover:bg-[#b00a10] text-white font-medium rounded-lg transition-colors duration-200">
                    <span>Saiba Mais</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-6">Quer participar de nossos projetos?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Entre em contato conosco e descubra como você pode fazer parte das nossas iniciativas
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-lg transition-colors duration-200">
              Entre em Contato
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Projetos
