"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import homeData from "../data/header.json"
import { useSearch } from "../context/SearchContext"


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation();

  
const { setTerm } = useSearch()
const navigate = useNavigate()
const [searchInput, setSearchInput] = useState("")
  
  const [showSearchInput, setShowSearchInput] = useState(false)

  const handleSearch = () => {
    if (searchInput.trim()) {
      setTerm(searchInput)
      navigate("/busca")
    }
  }
  const isActive = (path: string) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#222222] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">{homeData.header.topBanner}</p>
          <div className="flex space-x-4">
            <a href="https://web.facebook.com/p/Gera%C3%A7%C3%A3o-Milion%C3%A1ria-AGM-100082512764759/?_rdc=1&_rdr#" className="text-white hover:text-gray-300" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/associacaogeracaomilionaria/?igsh=YzljYTk1ODg3Zg%3D%3D#" target="_blank" rel="noreferrer" className="text-white hover:text-gray-300" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Gera%C3%A7%C3%A3oMilion%C3%A1ria2" rel="noreferrer" target="_blank" className="text-white hover:text-gray-300" aria-label="YouTube">
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
            {/* Logo */}<Link to="/" className="flex items-center space-x-3">
  {/* Logo Container */}
  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
    <img
      src="/assets/2024/07/2-100x100.webp"
      alt="Logo"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Text Content */}
  <div className="leading-tight">
    <h1 className="text-lg font-bold text-[#D10A11]">
      {homeData.header.logo.text}
    </h1>
    <p className="text-xs text-gray-600">
      {homeData.header.logo.subtitle}
    </p>
  </div>
</Link>


            <nav className="hidden md:flex space-x-6 relative">
  {homeData.header.navItems.map((item, index) => (
    <div key={index} className="relative group">
      <Link
  to={item.path}
  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[#D10A11] ${
    isActive(item.path) ? "text-[#D10A11] border-b-2 border-[#D10A11] pb-1" : "text-gray-700"
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


         {/* Desktop: md e acima */}
<div className="hidden md:flex items-center space-x-4">
  {showSearchInput && (
    <input
    type="text"
    placeholder="   Buscar..."
    className=" py-1.5 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D10A11] transition duration-200"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSearch()
    }}
    autoFocus
  />
  )}
  <button
    className="p-1"
    aria-label="Buscar"
    onClick={() => {
      if (showSearchInput) {
        handleSearch()
      } else {
        setShowSearchInput(true)
      }
    }}
  >
    <Search className="w-5 h-5" />
  </button>

  {/* Ficha de inscrição */}
  <Link
    to="/inscricao"
    className="px-4 py-2 bg-[#D10A11] text-white rounded-full hover:bg-[#b00a10] transition-colors duration-200"
  >
    Ficha de Inscrição
  </Link>
</div>

{/* Mobile: abaixo de md */}
<div className="flex md:hidden items-center space-x-4">
  {showSearchInput && (
    <input
    type="text"
    placeholder="Buscar..."
    className="px-3 py-1.5 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D10A11] transition duration-200"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSearch()
    }}
    autoFocus
  />
  
  )}
  <button
    className="p-1"
    aria-label="Buscar"
    onClick={() => {
      if (showSearchInput) {
        handleSearch()
      } else {
        setShowSearchInput(true)
      }
    }}
  >
    <Search className="w-5 h-5" />
  </button>

  {/* Botão menu hambúrguer */}
  <button
    className="p-1"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    aria-label="Toggle menu"
  >
    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</div>


          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {homeData.header.navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-sm font-medium transition-colors duration-200 hover:text-[#D10A11] ${
                    isActive(item.path) ? "text-[#D10A11]" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4 mt-0.5" />}
                </Link>
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
  )
}

export default Header
