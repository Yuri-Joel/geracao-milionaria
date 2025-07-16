import type React from "react"
import { Users, Target, Heart, Award } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Sobre: React.FC = () => {
  return (
    <div className="pt-24">
<Header />
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6">Sobre Nós</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça nossa história, missão e os valores que nos guiam na transformação de vidas
            </p>
          </div>
        </div>
      </section>
<section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-6">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-6">
                A Geração Milionária nasceu com o propósito de democratizar o acesso ao conhecimento e às oportunidades
                de crescimento pessoal e profissional. Acreditamos que todos merecem ter a chance de alcançar seus
                sonhos e objetivos.
              </p>
              <p className="text-lg text-gray-600">
                Através de programas inovadores, mentorias especializadas e uma comunidade engajada, criamos um
                ecossistema completo para o desenvolvimento humano e profissional.
              </p>
            </div>
            <div className="relative">
              <img
                src="/assets/2024/09/30.webp"
                alt="Nossa equipe"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F7B32B] rounded-lg z-[-1]"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D10A11] rounded-lg z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que norteiam todas as nossas ações e decisões
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border-t-4 border-[#D10A11] transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#D10A11]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunidade</h3>
              <p className="text-gray-600">
                Acreditamos no poder da união e colaboração para alcançar objetivos maiores.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center border-t-4 border-[#F7B32B] transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">

              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#F7B32B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Foco</h3>
              <p className="text-gray-600">Mantemos o foco nos resultados e no que realmente importa para o sucesso.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center border-t-4 border-[#D10A11] transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#D10A11]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Paixão</h3>
              <p className="text-gray-600">Fazemos tudo com paixão e dedicação, buscando sempre a excelência.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center border-t-4 border-[#F7B32B] transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[#F7B32B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excelência</h3>
              <p className="text-gray-600">Buscamos constantemente a melhoria e a entrega de valor excepcional.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">Nossa Equipe</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profissionais experientes e apaixonados por transformar vidas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={`/assets/2024/08/Design-sem-nome-4-2-150x150.webp`}
                    alt={`Membro da equipe ${member}`}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
    <img
      src="/assets/2024/07/2-100x100.webp"
      alt="Logo"
      className="w-full h-full object-cover"
    />
  </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nome do Profissional</h3>
                <p className="text-[#D10A11] font-medium mb-4">Cargo/Especialidade</p>
                <p className="text-gray-600">Breve descrição da experiência e especialidade do profissional.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">Nossa História</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça a trajetória da Geração Milionária ao longo dos anos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              { year: "2019", title: "Fundação", description: "Início das atividades da Geração Milionária." },
              {
                year: "2020",
                title: "Primeiros Projetos",
                description: "Lançamento dos primeiros programas de capacitação.",
              },
              {
                year: "2021",
                title: "Expansão",
                description: "Ampliação das atividades para outras regiões do país.",
              },
              {
                year: "2022",
                title: "Reconhecimento",
                description: "Premiação como uma das melhores iniciativas de impacto social.",
              },
              {
                year: "2023",
                title: "Parcerias Estratégicas",
                description: "Estabelecimento de parcerias com grandes empresas e instituições.",
              },
              {
                year: "2024",
                title: "Presente e Futuro",
                description: "Consolidação como referência em desenvolvimento pessoal e profissional.",
              },
            ].map((item, index) => (
              <div key={index} className="flex mb-12 last:mb-0">
                <div className="mr-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#D10A11] rounded-full flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                  {index !== 5 && <div className="w-1 h-full bg-[#D10A11] mt-4"></div>}
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Sobre
