

export const LoadingPage = ()=> {
    
    return ( <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
    {/* Barra no topo */}
    <div className="w-full h-2 bg-[#D10A11] absolute top-0" />

    {/* Logo com animação */}
    <img
      src="/assets/2024/07/2-100x100.webp"
      alt="Logo"
      className="w-24 h-24 animate-spin-slow"
    />

<div className="text-center text-4xl font-bold text-black">A. G. M</div>

  </div>) 

    }