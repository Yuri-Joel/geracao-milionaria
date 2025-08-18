
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Download,
  Share2,
  Heart,
  Calendar,
  MapPin,
  Camera,
  Grid3X3,
  List,
  Search,
} from "lucide-react"
import galeriaData from "../data/galeria.json"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LoadingPage } from "../components/Loading"

interface Photo {
  id: number
  title: string
  description: string
  category: string
  date: string
  location: string
  photographer: string
  image: string
  thumbnail: string
}

const Galeria: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [liked, setLiked] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const filteredPhotos = galeriaData.photos.filter((photo) => {
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory
    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo)
    setCurrentIndex(filteredPhotos.findIndex((p) => p.id === photo.id))
    setZoomLevel(1)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedPhoto(null)
    setIsFullscreen(false)
    setZoomLevel(1)
    document.body.style.overflow = "unset"
  }

  const navigatePhoto = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedPhoto) return

      setIsLoading(true)
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredPhotos.length
          : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length

      setCurrentIndex(newIndex)
      setSelectedPhoto(filteredPhotos[newIndex])
      setZoomLevel(1)

      setTimeout(() => setIsLoading(false), 300)
    },
    [currentIndex, filteredPhotos, selectedPhoto],
  )

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedPhoto) return

      switch (e.key) {
        case "Escape":
          closeModal()
          break
        case "ArrowLeft":
          navigatePhoto("prev")
          break
        case "ArrowRight":
          navigatePhoto("next")
          break
        case "f":
        case "F":
          setIsFullscreen(!isFullscreen)
          break
        case "+":
        case "=":
          setZoomLevel((prev) => Math.min(prev + 0.25, 3))
          break
        case "-":
          setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
          break
      }
    },
    [selectedPhoto, isFullscreen, navigatePhoto],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  const toggleLike = (photoId: number) => {
    setLiked((prev) => (prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]))
  }

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = filename
    link.click()
  }

  const shareImage = async (photo: Photo) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
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
    <div className="pt-24 bg-gray-50 min-h-screen">

    <Header />
      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B32B]/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{galeriaData.hero.title}</h1>
            <h2
              className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {galeriaData.hero.subtitle}
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {galeriaData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#D10A11] mb-2">{galeriaData.stats.totalPhotos}</div>
              <div className="text-gray-600 font-medium">Fotos Total</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#F7B32B] mb-2">{galeriaData.stats.totalEvents}</div>
              <div className="text-gray-600 font-medium">Eventos</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#D10A11] mb-2">{galeriaData.stats.totalWorkshops}</div>
              <div className="text-gray-600 font-medium">Workshops</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl font-bold text-[#F7B32B] mb-2">{galeriaData.stats.totalProjects}</div>
              <div className="text-gray-600 font-medium">Projetos</div>
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
                placeholder="Buscar fotos..."
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
                Todas
              </button>
              {galeriaData.categories.map((category) => (
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
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "masonry" ? "bg-[#D10A11] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(photo)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.thumbnail || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Controls */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(photo.id)
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                        liked.includes(photo.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${liked.includes(photo.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{
                        backgroundColor: galeriaData.categories.find((c) => c.id === photo.category)?.color,
                      }}
                    >
                      {galeriaData.categories.find((c) => c.id === photo.category)?.name}
                    </span>
                  </div>
                </div>

             {/*    <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#D10A11] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{photo.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(photo.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nenhuma foto encontrada</h3>
              <p className="text-gray-600">Tente ajustar os filtros ou termo de busca.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center ${isFullscreen ? "p-0" : "p-4"}`}
        >
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center space-x-4 text-white">
              <span className="text-lg font-semibold">
                {currentIndex + 1} / {filteredPhotos.length}
              </span>
              <div className="hidden md:block">
             {/*    <h3 className="text-xl font-semibold">{selectedPhoto.title}</h3>
              */} </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 3))}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5 text-white" />
                ) : (
                  <Maximize className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={() => downloadImage(selectedPhoto.image, selectedPhoto.title)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
              >
                <Download className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => shareImage(selectedPhoto)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
              >
                <Share2 className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={closeModal}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigatePhoto("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={() => navigatePhoto("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Main Image */}
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={selectedPhoto.image || "/placeholder.svg"}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-2xl p-6 text-white z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/*       <div>
                <h3 className="text-2xl font-semibold mb-2">{selectedPhoto.title}</h3>
                <p className="text-gray-300 mb-4">{selectedPhoto.description}</p>
              </div>
         */}      <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedPhoto.date).toLocaleDateString("pt-BR")}</span>
                </div>{/* 
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{"selectedPhoto.location"}</span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>{"Equipe AGM"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto overflow-y-hidden px-4 z-20">
            {filteredPhotos.slice(Math.max(0, currentIndex - 5), currentIndex + 6).map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => {
                  setCurrentIndex(filteredPhotos.findIndex((p) => p.id === photo.id))
                  setSelectedPhoto(photo)
                  setZoomLevel(1)
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  photo.id === selectedPhoto.id ? "border-white scale-110" : "border-transparent hover:border-white/50"
                }`}
              >
                <img
                  src={photo.thumbnail}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Galeria
