import type React from "react"
import { useState } from "react"
import { Play, Clock, Eye, Calendar, X, ExternalLink, Search, Grid3X3, List, Youtube } from "lucide-react"
import videosData from "../data/videos.json"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface Video {
  id: number
  title: string
  description: string
  category: string
  duration: string
  date: string
  views: string
  youtubeId: string
  thumbnail: string
}

const Videos: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredVideos = videosData.videos.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openModal = (video: Video) => {
    setSelectedVideo(video)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedVideo(null)
    document.body.style.overflow = "unset"
  }

  const openYouTube = (youtubeId: string) => {
    window.open(`${youtubeId}`, "_blank")
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
<Header  />
      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B32B]/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{videosData.hero.title}</h1>
            <h2
              className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {videosData.hero.subtitle}
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {videosData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#D10A11] mb-2">{videosData.stats.totalVideos}</div>
              <div className="text-gray-600 font-medium">Vídeos</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#F7B32B] mb-2">{videosData.stats.totalViews}</div>
              <div className="text-gray-600 font-medium">Visualizações</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#D10A11] mb-2">{videosData.stats.totalHours}h</div>
              <div className="text-gray-600 font-medium">Conteúdo</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#F7B32B] mb-2">{videosData.stats.subscribers}</div>
              <div className="text-gray-600 font-medium">Inscritos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar vídeos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D10A11] focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-[#D10A11] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              {videosData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `text-white shadow-lg`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : undefined,
                  }}
                >
                  {category.name}
                </button>
              ))}
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

      {/* Video Gallery */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative cursor-pointer" onClick={() => openModal(video)}>
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-[#D10A11] ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{
                          backgroundColor: videosData.categories.find((c) => c.id === video.category)?.color,
                        }}
                      >
                        {videosData.categories.find((c) => c.id === video.category)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D10A11] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(video.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openYouTube(video.youtubeId)
                        }}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Youtube className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-80 cursor-pointer" onClick={() => openModal(video)}>
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-[#D10A11] ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{
                            backgroundColor: videosData.categories.find((c) => c.id === video.category)?.color,
                          }}
                        >
                          {videosData.categories.find((c) => c.id === video.category)?.name}
                        </span>
                        <button
                          onClick={() => openYouTube(video.youtubeId)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Youtube className="w-5 h-5" />
                        </button>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#D10A11] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{video.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views} visualizações</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(video.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nenhum vídeo encontrado</h3>
              <p className="text-gray-600">Tente ajustar os filtros ou termo de busca.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="text-white">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => openYouTube(selectedVideo.youtubeId)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
                title="Abrir no YouTube"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={closeModal}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative w-full max-w-6xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
              title={selectedVideo.title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-2xl p-6 text-white z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{selectedVideo.views} visualizações</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedVideo.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedVideo.date).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
       <Footer />
    </div>
  )
}

export default Videos
