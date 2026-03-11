import type React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Users, Target, Award, TrendingUp, Heart, Star, Globe } from "lucide-react"
import EnhancedCarousel from "../components/EnhancedCarousel"
import homeData from "../data/home.json"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "../hooks/useAnimation"
import { LoadingPage } from "../components/Loading"


const Home: React.FC = () => {
  const { hero, stats, features, testimonials, cta, partners } = homeData.sections
  const { carousel } = homeData
  const animFeatures = useScrollAnimation("animate-zoom-in");
  const animTestimonials = useScrollAnimation("animate-slide-up");
  const animCTA = useScrollAnimation("animate-fade-in-up");


  const enhancedSlides = carousel.slides.map((slide, index) => ({
    ...slide,
    category: ["IMPACTO SOCIAL", "TRANSFORMAÇÃO", "OPORTUNIDADES"][index % 3],
  }))

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
      <EnhancedCarousel slides={enhancedSlides} autoplay={carousel.autoplay} delay={carousel.delay} />
      <section
        data-animate="animate-slide-up"
        className={`relative mt-10 z-30 transition-all duration-700 ease-out ${animTestimonials} `}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-md py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 animate-slide-left"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#D10A11] mb-2 animate-count-up">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-animate="animate-zoom-in" className={`py-10 bg-gradient-to-br mt-20 from-gray-50 via-white to-gray-50 relative overflow-hidden transition-all duration-700 ${animFeatures}`}>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D10A11]/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F7B32B]/5 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-[#D10A11] mb-8 leading-tight">
                {hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to={hero.cta.link}
                  className="group inline-flex items-center px-10 py-5 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                >
                  {hero.cta.text}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/sobre"
                  className="group inline-flex items-center px-10 py-5 border-2 border-[#D10A11] text-[#D10A11] hover:bg-[#D10A11] hover:text-white font-semibold rounded-full transition-all duration-300 text-lg"
                >
                  Nossa História
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-animate="animate-slide-up" className={`transition-all duration-700 ${animTestimonials} py-10 bg-white relative overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6">
              Conheça-Nos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas para o seu desenvolvimento pessoal e profissional
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row w-full justify-center gap-8 animate-zoom-in max-w-[80rem]">
              {features.map((feature, index) => {
                const Icon = {
                  Users,
                  Target,
                  Award,
                  TrendingUp,
                }[feature.icon];

                return (
                  <div
                    key={index}
                    className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-[#D10A11]/20 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative w-full max-w-sm group cursor-pointer">
                      <div className="absolute rounded-lg inset-0 w-full h-full bg-white border-[1px] border-gray-100 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className={`relative rounded-lg z-10 w-full h-full min-h-[320px] ${'bg-[#FFFFFF]'} border-gray-100 p-8 flex flex-col justify-between transition-all duration-300 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2`}>
                        <div>
                           <div
                              className={`w-16 h-16 ${feature.color === "red" ? "bg-red-100" : "bg-amber-100"
                                } rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                            >
                          {Icon && (
                            <Icon
                              className={`w-8 h-8 ${feature.color === "red" ? "text-[#D10A11]" : "text-[#F7B32B]"
                                }`}
                            />
                          )}
                          </div>
                          <h2 className="text-xl font-bold uppercase flex items-center text-black mb-4">
                            {feature.title}
                          </h2>

                          <p className="text-black/80 font-medium leading-relaxed mb-8">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section data-animate="animate-fade-in-up" className={`transition-all duration-700 ${animCTA} py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-[#D10A11] mb-6">{testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden  animate-slide-up"
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path
                      d="M15 45V30C15 22.5 20 15 30 15V22.5C25 22.5 22.5 25 22.5 30H30V45H15ZM37.5 45V30C37.5 22.5 42.5 15 52.5 15V22.5C47.5 22.5 45 25 45 30H52.5V45H37.5Z"
                      fill="#D10A11"
                    />
                  </svg>
                </div>

                <div className="flex items-center mb-6"><div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D10A11] to-[#F7B32B] p-0.5">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.profession}</p>
                  </div>
                </div>

                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#F7B32B] fill-current"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#D10A11] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#D10A11] via-[#b00a10] to-[#D10A11] animate-gradient-x"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#F7B32B]/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in-up">
              {cta.title}
            </h2>
            <p className="text-xl md:text-2xl text-red-100 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {cta.subtitle}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                to={cta.primaryButton.link}
                className="group inline-flex items-center px-10 py-5 bg-white text-[#D10A11] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                <Heart className="mr-3 w-6 h-6 group-hover:text-[#F7B32B] transition-colors duration-300" />
                {cta.primaryButton.text}
              </Link>
              <Link
                to={cta.secondaryButton.link}
                className="group inline-flex items-center px-10 py-5 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#D10A11] transition-all duration-300 text-lg"
              >
                <Globe className="mr-3 w-6 h-6" />
                {cta.secondaryButton.text}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D10A11] mb-4">
              {partners.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{partners.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 ">
            {partners.items.map((partner, index) => (
              <div
                key={index}
                className="w-48 h-56 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <figure className="flex flex-col items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-40 h-40 object-contain mb-2"
                  />
                  <figcaption className="text-gray-600 text-base font-medium text-center">
                    {partner.name}
                  </figcaption>
                </figure>
              </div>

            ))}

          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Home
