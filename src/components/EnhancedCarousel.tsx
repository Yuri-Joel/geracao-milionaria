import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules"
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from "lucide-react"
import { Link } from "react-router-dom"
import type { Swiper as SwiperType } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import "swiper/css/parallax"

interface CarouselSlide {
  id: number
  title: string
  description: string
  image: string
  link: string
  category?: string
}

interface EnhancedCarouselProps {
  slides: CarouselSlide[]
  autoplay?: boolean
  delay?: number
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({ slides, autoplay = true, delay = 6000 }) => {
  const swiperRef = useRef<SwiperType>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 100 / (delay / 100)
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, delay, currentSlide])

  useEffect(() => {
    if (progress >= 100 && isPlaying) {
      swiperRef.current?.slideNext()
      setProgress(0)
    }
  }, [progress, isPlaying])

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying)
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop()
      } else {
        swiperRef.current.autoplay.start()
      }
    }
  }

  return (
    <div className="relative w-full h-[40vh] md:h-[100vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        parallax={true}
        speed={1200}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        autoplay={isPlaying ? { delay, disableOnInteraction: false } : false}
        loop={true}
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper: SwiperType) => {
          setCurrentSlide(swiper.realIndex)
          setProgress(0)
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0  bg-cover bg-center b bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
                data-swiper-parallax="-20%"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              <div className="relative z-10 flex items-center h-full">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl lg:ml-28">
                    {slide.category && (
                      <div
                        className="inline-block mb-4 opacity-0 animate-fade-in-up"
                        data-swiper-parallax="-100"
                        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
                      >
                        <span className="px-4 py-2 bg-[#D10A11] text-white text-sm font-medium rounded-full">
                          {slide.category}
                        </span>
                      </div>
                    )}

                    <h2
                      className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight opacity-0 animate-fade-in-up md:max-w-[40rem] max-w-[25rem]"
                      data-swiper-parallax="-200"
                      style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
                    >
                      {slide.title}
                    </h2>


                    <p
                      className="text-xl md:text-2xl hidden md:block text-white/90 mb-8 max-w-2xl leading-relaxed opacity-0 animate-fade-in-up"
                      data-swiper-parallax="-300"
                      style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                    >
                      {slide.description}
                    </p>

                    <div
                      className="opacity-0 animate-fade-in-up"
                      data-swiper-parallax="-400"
                      style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
                    >
                      <Link
                        to={slide.link}
                        className="group inline-flex items-center px-8 py-4 bg-[#D10A11] hover:bg-[#b00a10] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                      >
                        <span className="mr-3">Saiba Mais</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute bottom-32 right-32 w-16 h-16 bg-[#F7B32B]/30 rounded-full animate-bounce"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute hidden md:block left-8 top-1/2 transform -translate-y-1/2 z-20">
        <button className="swiper-button-prev-custom group w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
          <ChevronLeft className="w-8 h-8 text-white group-hover:text-[#F7B32B] transition-colors duration-300" />
        </button>
      </div>

      <div className="absolute hidden md:block right-8 top-1/2 transform -translate-y-1/2 z-20">
        <button className="swiper-button-next-custom group w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
          <ChevronRight className="w-8 h-8 text-white group-hover:text-[#F7B32B] transition-colors duration-300" />
        </button>
      </div>

      <div className="absolute bottom-8 left-8 hidden md:flex z-20 items-center space-x-6">
        <button
          onClick={toggleAutoplay}
          className="group w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white group-hover:text-[#F7B32B] transition-colors duration-300" />
          ) : (
            <Play className="w-5 h-5 text-white group-hover:text-[#F7B32B] transition-colors duration-300 ml-0.5" />
          )}
        </button>

        <div className="text-white/80 font-medium">
          <span className="text-2xl font-bold text-white">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="absolute bottom-8 hidden md:flex right-8 z-20 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              swiperRef.current?.slideTo(index)
              setProgress(0)
            }}
            className={`relative w-12 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/30 hover:bg-white/50"
              }`}
          >
            {index === currentSlide && (
              <div
                className="absolute top-0 left-0 h-full bg-[#c7c549] rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 hidden md:block transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedCarousel
