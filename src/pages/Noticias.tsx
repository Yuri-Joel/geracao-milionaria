"use client"

import React from "react"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Noticias: React.FC = () => {
  const noticias = [
    {
      id: 1,
      title: "Novo Programa de Capacitação Profissional",
      excerpt: "Lançamos um programa inovador para desenvolvimento de habilidades digitais e empreendedorismo.",
      content: "Conteúdo completo da notícia...",
      image: "/placeholder.svg?height=300&width=500",
      author: "Equipe GM",
      date: "2024-01-15",
      category: "Programas",
    },
    {
      id: 2,
      title: "Parceria com Grandes Empresas",
      excerpt: "Firmamos parcerias estratégicas para ampliar oportunidades de emprego e crescimento.",
      content: "Conteúdo completo da notícia...",
      image: "/placeholder.svg?height=300&width=500",
      author: "Equipe GM",
      date: "2024-01-10",
      category: "Parcerias",
    },
    {
      id: 3,
      title: "Resultados Extraordinários em 2024",
      excerpt: "Mais de 10.000 pessoas impactadas positivamente através de nossos programas.",
      content: "Conteúdo completo da notícia...",
      image: "/placeholder.svg?height=300&width=500",
      author: "Equipe GM",
      date: "2024-01-05",
      category: "Resultados",
    },
    {
      id: 4,
      title: "Workshop de Liderança Feminina",
      excerpt: "Evento especial focado no empoderamento e desenvolvimento de lideranças femininas.",
      content: "Conteúdo completo da notícia...",
      image: "/placeholder.svg?height=300&width=500",
      author: "Equipe GM",
      date: "2023-12-20",
      category: "Eventos",
    },
    {
      id: 5,
      title: "Expansão para Novas Cidades",
      excerpt: "Anunciamos a expansão de nossos programas para mais 5 cidades brasileiras.",
      content: "Conteúdo completo da notícia...",
      image: "/placeholder.svg?height=300&width=500",
      author: "Equipe GM",
      date: "2023-12-15",
      category: "Expansão",
    },
    {
      id: 6,
      title: "Prêmio de Inovação Social",
      excerpt: "Fomos reconhecidos com o prêmio de melhor iniciativa de impacto social do ano.",
      content: "Conteúdo completo da notícia...",
      image: "/placeholder.svg?height=300&width=500",
      author: "Equipe GM",
      date: "2023-12-10",
      category: "Reconhecimento",
    },
  ]

  const categorias = ["Todas", "Programas", "Parcerias", "Resultados", "Eventos", "Expansão", "Reconhecimento"]
  const [categoriaAtiva, setCategoriaAtiva] = React.useState("Todas")

  const noticiasFiltradas =
    categoriaAtiva === "Todas" ? noticias : noticias.filter((noticia) => noticia.category === categoriaAtiva)

  return (
    <div className="pt-24">
      <Header />
      <section className="py-20 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Notícias</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fique por dentro das últimas novidades, conquistas e iniciativas da Geração Milionária
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaAtiva(categoria)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  categoriaAtiva === categoria
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticiasFiltradas.map((noticia) => (
              <article
                key={noticia.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={noticia.image || "/placeholder.svg"}
                  alt={noticia.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {noticia.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{noticia.title}</h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">{noticia.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{noticia.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(noticia.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>

                  <Link
                    to={`/noticias/${noticia.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Receba nossas novidades</h2>
            <p className="text-xl text-gray-600 mb-8">
              Inscreva-se em nossa newsletter e seja o primeiro a saber sobre nossos programas e conquistas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Noticias
