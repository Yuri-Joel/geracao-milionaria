import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sobre from './pages/Sobre';
import Home from './pages/Home';
import Projetos from './pages/Projetos';
import Noticias from './pages/Noticias';
import Contato from './pages/Contacto';
import NotFound from './pages/NotFound';
import WhatsAppButton from './components/WhatsAppButton';
import ComoDoar from './pages/ComoDoar';
import Galeria from './pages/Galeria';
import Videos from './pages/Galeria-de-videos';
import { SearchProvider } from './context/SearchContext';
import Busca from './pages/Busca';

function App() {
  return (
    <>
    <SearchProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contato />} />
        <Route path='/como-doar' element={<ComoDoar />} />
        <Route path='/galeria' element={<Galeria />} />
        <Route path='/galeria-de-videos' element={<Videos/>} />
        <Route path='/busca' element={<Busca />} />

    {/* Rota para páginas inexistentes */}
    <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </SearchProvider>
       <WhatsAppButton />
       </>
  );
}

export default App;
