import type React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Users, Target, Award, TrendingUp } from "lucide-react"
import Carousel from "../components/Carrosel"
import homeData from "../data/home.json"

const Home: React.FC = () => {
  const { carousel, sections } = homeData

  return (
    <div className="pt-24">
      {/* Carousel Section */}
      <Carousel slides={carousel.slides} autoplay={carousel.autoplay} delay={carousel.delay} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6 leading-tight">{sections.hero.title}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{sections.hero.subtitle}</p>
            <Link
              to={sections.hero.cta.link}
              className="inline-flex items-center px-8 py-4 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-lg transition-colors duration-200 group text-lg"
            >
              {sections.hero.cta.text}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">
              Por que escolher a Geração Milionária?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para o seu desenvolvimento pessoal e profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-t-4 border-[#D10A11]">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#D10A11]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunidade Ativa</h3>
              <p className="text-gray-600">
                Faça parte de uma comunidade engajada de pessoas que buscam crescimento e sucesso.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-t-4 border-[#F7B32B]">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#F7B32B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Foco em Resultados</h3>
              <p className="text-gray-600">
                Metodologias comprovadas e estratégias práticas para alcançar seus objetivos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-t-4 border-[#D10A11]">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-[#D10A11]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excelência</h3>
              <p className="text-gray-600">
                Padrão de qualidade elevado em todos os nossos programas e serviços oferecidos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-t-4 border-[#F7B32B]">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#F7B32B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Crescimento</h3>
              <p className="text-gray-600">
                Acompanhamento contínuo do seu progresso e evolução em todas as áreas da vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#D10A11]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para transformar sua vida?</h2>
            <p className="text-xl text-red-100 mb-8">
              Junte-se a milhares de pessoas que já descobriram o caminho para o sucesso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className="inline-flex items-center px-8 py-4 bg-white text-[#D10A11] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Entre em Contato
              </Link>
              <Link
                to="/sobre"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#D10A11] transition-colors duration-200"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">Depoimentos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que dizem as pessoas que já transformaram suas vidas com a Geração Milionária
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.6667 6.66667H6.66667V16.6667H16.6667V6.66667ZM33.3333 6.66667H23.3333V16.6667H33.3333V6.66667ZM16.6667 23.3333H6.66667V33.3333H16.6667V23.3333ZM33.3333 23.3333H23.3333V33.3333H33.3333V23.3333Z"
                      fill="#F7B32B"
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Nome do Cliente</h4>
                    <p className="text-sm text-gray-500">Profissão</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "A Geração Milionária transformou completamente minha visão sobre finanças e desenvolvimento pessoal.
                  Hoje tenho mais clareza sobre meus objetivos e estou no caminho certo para alcançá-los."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-[#F7B32B]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#D10A11] mb-4">Nossos Parceiros</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Empresas e instituições que acreditam no nosso trabalho</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="w-32 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <div className="text-gray-400 font-semibold">Parceiro {index}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
