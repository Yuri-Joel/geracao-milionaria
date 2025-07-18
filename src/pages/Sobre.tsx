"use client"

import type React from "react"
import { useState } from "react"
import {
  Users,
  Target,
  Heart,
  Award,
  Shield,
  Globe,
  Megaphone,
  Camera,
  Share2,
  Newspaper,
  Monitor,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calendar,
  TrendingUp,
} from "lucide-react"
import sobreData from "../data/sobre.json"
import Footer from "../components/Footer"
import Header from "../components/Header"

const Sobre: React.FC = () => {
  const [activeTeamTab, setActiveTeamTab] = useState(0)
  const [expandedMember, setExpandedMember] = useState<number | null>(null)

  const getIcon = (iconName: string) => {
    const icons = {
      users: Users,
      target: Target,
      heart: Heart,
      award: Award,
      shield: Shield,
      globe: Globe,
      megaphone: Megaphone,
      camera: Camera,
      "share-2": Share2,
      newspaper: Newspaper,
      monitor: Monitor,
    }
    return icons[iconName as keyof typeof icons] || Users
  }

  return (
    <div className="pt-24">
<Header />
      <section className="relative py-20 bg-gradient-to-r from-[#D10A11] to-[#b00a10] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B32B]/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{sobreData.hero.title}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {sobreData.hero.subtitle}
            </p>
            <p className="text-lg opacity-80 mt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {sobreData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sobreData.stats.data.map((stat, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#D10A11] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-6">{sobreData.mission.title}</h2>
              {sobreData.mission.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 mb-6">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {sobreData.mission.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#F7B32B] rounded-full"></div>
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={sobreData.mission.image || "/placeholder.svg"}
                alt="Nossa missão"
                className="rounded-2xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F7B32B] rounded-2xl z-[-1] animate-float"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D10A11] rounded-2xl z-[-1] animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-6">{sobreData.vision.title}</h2>
            <p className="text-xl text-gray-600 mb-12">{sobreData.vision.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sobreData.vision.goals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <TrendingUp className="w-8 h-8 text-[#F7B32B] mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-4">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que norteiam todas as nossas ações e decisões
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sobreData.values.map((value, index) => {
              const IconComponent = getIcon(value.icon)
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-t-4 animate-fade-in-up"
                  style={{
                    borderTopColor: value.color,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${value.color}20` }}
                  >
                    <IconComponent className="w-8 h-8" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-4">{sobreData.team.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{sobreData.team.subtitle}</p>
          </div>

          {/* Department Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sobreData.team.departments.map((dept, index) => (
              <button
                key={index}
                onClick={() => setActiveTeamTab(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTeamTab === index
                    ? "bg-[#D10A11] text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Active Department */}
          <div className="animate-fade-in-up">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {sobreData.team.departments[activeTeamTab].name}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">{sobreData.team.departments[activeTeamTab].description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sobreData.team.departments[activeTeamTab].members.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="p-8 text-center">
                    <div className="relative inline-block mb-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img src="/assets/2024/07/2-100x100.webp" alt="Logo" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-[#D10A11] font-medium mb-4">{member.position}</p>
                    <p className="text-gray-600 mb-6">{member.bio}</p>

                    <button
                      onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                      className="inline-flex items-center space-x-2 text-[#D10A11] hover:text-[#b00a10] font-medium transition-colors"
                    >
                      <span>{expandedMember === member.id ? "Ver menos" : "Ver mais"}</span>
                      {expandedMember === member.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {expandedMember === member.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200 text-left animate-fade-in-up">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Especialidades:</h5>
                            <div className="flex flex-wrap gap-2">
                              {member.specialties.map((specialty, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-[#D10A11]/10 text-[#D10A11] rounded-full text-sm font-medium"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Formação:</h5>
                            <p className="text-gray-600">{member.education}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Contato:</h5>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-[#D10A11]" />
                                <a
                                  href={`mailto:${member.contact.email}`}
                                  className="text-gray-600 hover:text-[#D10A11] transition-colors"
                                >
                                  {member.contact.email}
                                </a>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-[#D10A11]" />
                                <a
                                  href={`tel:${member.contact.phone}`}
                                  className="text-gray-600 hover:text-[#D10A11] transition-colors"
                                >
                                  {member.contact.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Communication Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-4">{sobreData.communication.title}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">{sobreData.communication.subtitle}</p>
              <p className="text-gray-600 max-w-3xl mx-auto">{sobreData.communication.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {sobreData.communication.services.map((service, index) => {
                const IconComponent = getIcon(service.icon)
                return (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-[#D10A11]/20"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-[#D10A11] to-[#F7B32B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Communication Contact */}
            <div className="bg-gradient-to-r from-[#D10A11] to-[#b00a10] rounded-3xl p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Entre em Contato com Nossa Equipe</h3>
                  <p className="text-red-100 mb-6">
                    Nossa equipe de comunicação está sempre disponível para atender a imprensa, parceiros e
                    interessados.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5" />
                      <a
                        href={`mailto:${sobreData.communication.contact.email}`}
                        className="hover:text-[#F7B32B] transition-colors"
                      >
                        {sobreData.communication.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5" />
                      <a
                        href={`tel:${sobreData.communication.contact.phone}`}
                        className="hover:text-[#F7B32B] transition-colors"
                      >
                        {sobreData.communication.contact.phone}
                      </a>
                    </div>
                    
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Siga-nos nas Redes Sociais</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(sobreData.communication.contact.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="capitalize">{platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-4">{sobreData.history.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{sobreData.history.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {sobreData.history.timeline.map((item, index) => (
              <div
                key={index}
                className="flex mb-12 last:mb-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mr-8 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#D10A11] to-[#F7B32B] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.year}
                  </div>
                  {index !== sobreData.history.timeline.length - 1 && (
                    <div className="w-1 h-full bg-gradient-to-b from-[#D10A11] to-[#F7B32B] mt-4 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 pt-3">
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-[#D10A11] mb-3">Principais Conquistas:</h4>
                      {item.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#F7B32B] rounded-full"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D10A11] mb-4">{sobreData.certifications.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reconhecimentos que validam nosso compromisso com a excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sobreData.certifications.items.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 text-center"
              >
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.name}
                  className="w-20 h-20 mx-auto mb-6 object-contain"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{cert.name}</h3>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <div className="flex items-center justify-center space-x-2 text-[#D10A11] font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{cert.year}</span>
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
