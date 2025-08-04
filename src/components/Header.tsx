"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import homeData from "../data/header.json"
import { useSearch } from "../context/SearchContext"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const location = useLocation()
  const { setTerm } = useSearch()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")

  const handleSearch = () => {
    if (searchInput.trim()) {
      setTerm(searchInput)

      document.body.style.overflow = "unset"
      navigate("/busca")
      setShowSearchModal(false)
      setSearchInput("")
    }
  }

  const openSearchModal = () => {
    setShowSearchModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeSearchModal = () => {
    setShowSearchModal(false)
    setSearchInput("")
    document.body.style.overflow = "unset"
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        {/* Top Banner */}
        <div className="bg-[#222222] text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p className="text-sm">A sua ajuda faz toda a diferença. Seja <Link to={"/inscricao"} className="text-[#CB0A34] underline">Membro</Link></p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/p/Gera%C3%A7%C3%A3o-Milion%C3%A1ria-AGM-100082512764759/?_rdc=1&_rdr#"
                className="text-white hover:text-gray-300"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/associacaogeracaomilionaria/?igsh=YzljYTk1ODg3Zg%3D%3D#"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-gray-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Gera%C3%A7%C3%A3oMilion%C3%A1ria2"
                rel="noreferrer"
                target="_blank"
                className="text-white hover:text-gray-300"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
  {/* Logo Container */}
  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
    <img src="/assets/2024/07/2-100x100.webp" alt="Logo" className="w-full h-full object-cover" />
  </div>
  {/* Text Content */}
  <div className="leading-tight mt-1">
    <h1 className="text-lg font-bold text-[#D10A11]">{homeData.header.logo.text}</h1>
    <p className="text-xs text-gray-600">{homeData.header.logo.subtitle}</p>
  </div>
</Link>


              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6 relative">
                {homeData.header.navItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[#D10A11] ${isActive(item.path) ? "text-[#D10A11] border-b-2 border-[#D10A11] pb-1" : "text-gray-700"
                        }`}
                    >
                      {item.name}
                      {item.submenu && <ChevronDown className="w-4 h-4 mt-0.5" />}
                    </Link>
                    {/* Submenu */}
                    {item.submenu && (
                      <div className="absolute left-0 top-full mt-2 w-40 bg-white border shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 translate-y-2 z-50">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden md:flex space-x-6 relative">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={openSearchModal}
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <Link
                  to="/inscricao"
                  className="ml-2 px-4 py-2 bg-[#D10A11] text-white rounded-full hover:bg-[#b00a10] transition-colors duration-200 whitespace-nowrap"
                >
                  Ficha de Inscrição
                </Link>

              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={openSearchModal}
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <nav className="container mx-auto px-4 py-4 space-y-4">
                {homeData.header.navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      className={`block text-sm font-medium transition-colors duration-200 hover:text-[#D10A11] ${isActive(item.path) ? "text-[#D10A11]" : "text-gray-700"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block text-sm text-gray-600 hover:text-[#D10A11] transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  to="/inscricao"
                  className="block px-4 py-2 bg-[#D10A11] text-white rounded-full hover:bg-[#b00a10] transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ficha de Inscrição
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={closeSearchModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 p-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#D10A11] to-[#F7B32B] rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Buscar</h2>
                  <p className="text-gray-600">O que você está procurando?</p>
                </div>
              </div>
              <button
                onClick={closeSearchModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Digite sua busca aqui..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#D10A11] transition-colors"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch()
                  if (e.key === "Escape") closeSearchModal()
                }}
                autoFocus
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSearch}
                disabled={!searchInput.trim()}
                className="px-8 py-3 bg-gradient-to-r from-[#D10A11] to-[#b00a10] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Buscar Agora
              </button>
              <button
                onClick={closeSearchModal}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>

            {/* Search Suggestions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Sugestões de busca:</p>
              <div className="flex flex-wrap gap-2">
                {["projetos", "galeria", "vídeos", "sobre nós", "comunicados", "doações"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchInput(suggestion)
                      setTerm(suggestion)
                      navigate("/busca")
                      closeSearchModal()
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#D10A11] hover:text-white text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
