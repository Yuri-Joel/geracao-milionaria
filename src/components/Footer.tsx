import type React from "react"
import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="/assets/2024/07/2-100x100.webp"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Geração Milionária</h3>
                <p className="text-sm text-gray-400">Transformando Vidas</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Somos uma organização dedicada ao desenvolvimento pessoal e profissional, criando pontes para o sucesso e
              transformando vidas através de oportunidades reais.
            </p>
            <div className="flex space-x-4">
            <a href="https://web.facebook.com/p/Gera%C3%A7%C3%A3o-Milion%C3%A1ria-AGM-100082512764759/?_rdc=1&_rdr#" className="text-white hover:text-gray-300" aria-label="Facebook" target="_blank">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/associacaogeracaomilionaria/?igsh=YzljYTk1ODg3Zg%3D%3D#" target="_blank" className="text-white hover:text-gray-300" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Gera%C3%A7%C3%A3oMilion%C3%A1ria2" target="_blank" className="text-white hover:text-gray-300" aria-label="YouTube">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Projetos
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/comunicado" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Comunicado
                </Link>
              </li>
              <li>
                <Link to="/documentos" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Documentos
                </Link>
              </li>
              <li>
                <Link to="/como-doar" className="text-gray-300 hover:text-[#F7B32B] transition-colors duration-200">
                  Como Doar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-[#F7B32B]" />
                <span className="text-gray-300">contato@geracaomilionaria.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-[#F7B32B]" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#F7B32B] mt-1" />
                <span className="text-gray-300">
                  Estamos localizados
                  <br />
                  no Camama.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Geração Milionária. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacidade"
              className="text-gray-400 hover:text-[#F7B32B] text-sm transition-colors duration-200"
            >
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-gray-400 hover:text-[#F7B32B] text-sm transition-colors duration-200">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
