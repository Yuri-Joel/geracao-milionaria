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
import ScrollToTop from './components/ScrolllTop';
import DonationPrompt from './components/DonationPrompt';
import { Inscricao } from './pages/inscricao';
import Comunicado from './pages/Comunicado';
import CadastroPage from './pages/new-projectos';

function App() {
  return (
    <>
    <SearchProvider>
    <Router>
    <ScrollToTop /> 
    <DonationPrompt triggerMinutes={[1, 5, 10, 15]} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/projectos" element={<Projetos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contato />} />
        <Route path='/como-doar' element={<ComoDoar />} />
        <Route path='/galeria' element={<Galeria />} />
        <Route path='/galeria-de-videos' element={<Videos/>} />
        <Route path='/busca' element={<Busca />} />
        <Route path='/inscricao' element={<Inscricao />} />
        <Route path='/comunicados' element={<Comunicado />} />
        
        <Route path='/register' element={<CadastroPage />} />
      
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
