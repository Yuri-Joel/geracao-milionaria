"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearch } from "../context/SearchContext"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  Eye,
  User,
  ArrowRight,
  ImageIcon,
  Play,
  FileText,
} from "lucide-react"
import projetos from "../data/projetos.json"
import galeria from "../data/galeria.json"
import videos from "../data/videos.json"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

interface SearchResult {
  id: number
  title: string
  description: string
  tipo: "Projeto" | "Foto" | "Vídeo"
  image?: string
  thumbnail?: string
  date?: string
  location?: string
  views?: string
  duration?: string
  author?: string
  photographer?: string
  category?: string
  link?: string
}

const Busca: React.FC = () => {
  const { term } = useSearch()
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!term) {
      setResults([])
      setFilteredResults([])
      return
    }

    setIsLoading(true)

    // Simular delay de busca para melhor UX
    setTimeout(() => {
      const allData: SearchResult[] = [
        // Projetos
        ...projetos.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          tipo: "Projeto" as const,
          image: p.image,
          date: p.startDate,
          category: p.status,
          link: `/projetos/${p.id}`,
        })),
        // Galeria
        ...galeria.photos.map((g: any) => ({
          id: g.id,
          title: g.title,
          description: g.description,
          tipo: "Foto" as const,
          image: g.image,
          thumbnail: g.thumbnail,
          date: g.date,
          location: g.location,
          photographer: g.photographer,
          category: g.category,
          link: `/galeria#${g.id}`,
        })),
        // Vídeos
        ...videos.videos.map((v: any) => ({
          id: v.id,
          title: v.title,
          description: v.description,
          tipo: "Vídeo" as const,
          thumbnail: v.thumbnail,
          date: v.date,
          views: v.views,
          duration: v.duration,
          category: v.category,
          link: `/videos#${v.id}`,
        })),
      ]

      const lowerTerm = term.toLowerCase()
      const filtered = allData.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerTerm) ||
          item.description.toLowerCase().includes(lowerTerm) ||
          (item.category && item.category.toLowerCase().includes(lowerTerm)) ||
          (item.location && item.location.toLowerCase().includes(lowerTerm)),
      )

      setResults(filtered)
      setFilteredResults(filtered)
      setIsLoading(false)
    }, 500)
  }, [term])

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredResults(results)
    } else {
      setFilteredResults(results.filter((result) => result.tipo === selectedFilter))
    }
  }, [selectedFilter, results])

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "Projeto":
        return <FileText className="w-4 h-4" />
      case "Foto":
        return <ImageIcon className="w-4 h-4" />
      case "Vídeo":
        return <Play className="w-4 h-4" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "Projeto":
        return "bg-blue-100 text-blue-800"
      case "Foto":
        return "bg-green-100 text-green-800"
      case "Vídeo":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: filteredResults.length,
    projetos: filteredResults.filter((r) => r.tipo === "Projeto").length,
    fotos: filteredResults.filter((r) => r.tipo === "Foto").length,
    videos: filteredResults.filter((r) => r.tipo === "Vídeo").length,
  }

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
            <div className="flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-white/80" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">Resultados da Busca</h1>
            <p className="text-xl opacity-90 mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Você pesquisou por: <span className="font-bold text-[#F7B32B]">"{term}"</span>
            </p>
            {!isLoading && (
              <p className="text-lg opacity-80 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                {stats.total} {stats.total === 1 ? "resultado encontrado" : "resultados encontrados"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!isLoading && stats.total > 0 && (
        <section className="relative -mt-16 z-30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-bold text-[#D10A11] mb-2">{stats.total}</div>
                <div className="text-gray-600 font-medium">Total</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.projetos}</div>
                <div className="text-gray-600 font-medium">Projetos</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.fotos}</div>
                <div className="text-gray-600 font-medium">Fotos</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-bold text-red-600 mb-2">{stats.videos}</div>
                <div className="text-gray-600 font-medium">Vídeos</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters and Controls */}
      {!isLoading && stats.total > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === "all"
                      ? "bg-[#D10A11] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Todos ({stats.total})</span>
                </button>
                <button
                  onClick={() => setSelectedFilter("Projeto")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === "Projeto"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Projetos ({stats.projetos})</span>
                </button>
                <button
                  onClick={() => setSelectedFilter("Foto")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === "Foto"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Fotos ({stats.fotos})</span>
                </button>
                <button
                  onClick={() => setSelectedFilter("Vídeo")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === "Vídeo"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Vídeos ({stats.videos})</span>
                </button>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-[#D10A11] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-[#D10A11] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Loading State
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#D10A11]/30 border-t-[#D10A11] rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Buscando...</h3>
              <p className="text-gray-600">Procurando os melhores resultados para você</p>
            </div>
          ) : stats.total === 0 ? (
            // No Results State
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nenhum resultado encontrado</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Não encontramos nada para "{term}". Tente usar palavras-chave diferentes ou mais gerais.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  <strong>Dicas de busca:</strong>
                </p>
                <p>• Use palavras-chave mais simples</p>
                <p>• Verifique a ortografia</p>
                <p>• Tente termos mais gerais</p>
              </div>
              <Link to={"/"} className="text-white rounded-md p-5  bg-[#b00a10]">
                Volte a pagina Home 
              </Link>
            </div>
          ) : (
            // Results Grid/List
            <div
              className={`${
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"
              }`}
            >
              {filteredResults.map((result, index) => (
                <div
                  key={`${result.tipo}-${result.id}`}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up ${
                    viewMode === "list" ? "flex flex-col md:flex-row" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image/Thumbnail */}
                  {(result.image || result.thumbnail) && (
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-80" : ""}`}>
                      <img
                        src={result.image || result.thumbnail || "/placeholder.svg"}
                        alt={result.title}
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                          viewMode === "list" ? "h-48 md:h-full" : "h-48"
                        }`}
                      />

                      {/* Overlay for videos */}
                      {result.tipo === "Vídeo" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-[#D10A11] ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Duration badge for videos */}
                      {result.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                          {result.duration}
                        </div>
                      )}

                      {/* Type badge */}
                      <div className="absolute top-2 left-2">
                        <span
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.tipo)}`}
                        >
                          {getTypeIcon(result.tipo)}
                          <span>{result.tipo}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#D10A11] transition-colors line-clamp-2">
                        {result.title}
                      </h3>
                      {!result.image && !result.thumbnail && (
                        <span
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.tipo)}`}
                        >
                          {getTypeIcon(result.tipo)}
                          <span>{result.tipo}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{result.description}</p>

                    {/* Metadata */}
                    <div className="space-y-2 mb-4">
                      {result.date && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(result.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      )}

                      {result.location && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{result.location}</span>
                        </div>
                      )}

                      {result.views && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{result.views} visualizações</span>
                        </div>
                      )}

                      {result.photographer && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{result.photographer}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {result.link && (
                      <Link
                        to={result.link}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#D10A11] hover:bg-[#b00a10] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <span>Ver {result.tipo}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Suggestions Section */}
      {!isLoading && stats.total > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#D10A11] mb-6">Não encontrou o que procurava?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Explore nossas seções principais para descobrir mais conteúdo
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/projetos"
                  className="group p-6 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors duration-300"
                >
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Projetos</h3>
                  <p className="text-gray-600">Conheça nossos projetos e iniciativas</p>
                </Link>
                <Link
                  to="/galeria"
                  className="group p-6 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors duration-300"
                >
                  <ImageIcon className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Galeria</h3>
                  <p className="text-gray-600">Veja nossa galeria de fotos</p>
                </Link>
                <Link
                  to="/galeria-de-videos"
                  className="group p-6 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors duration-300"
                >
                  <Play className="w-12 h-12 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Vídeos</h3>
                  <p className="text-gray-600">Assista nossos vídeos</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Busca
