"use client"

import type React from "react"
import { useEffect, useState } from "react"
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
  ChevronDown,
  ChevronUp,
  Calendar,
  TrendingUp,
} from "lucide-react"
import sobreData from "../data/sobre.json"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { LoadingPage } from "../components/Loading"

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
    <div className="pt-24">
  <Header />

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
                    <p className="text-gray-600 mb-6 text-justify">{member.bio}</p>

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
      <Footer />
    </div>
  )
}

export default Sobre
