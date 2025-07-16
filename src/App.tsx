import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sobre from './pages/Sobre';
import Home from './pages/Home';
import Projetos from './pages/Projetos';
import Noticias from './pages/Noticias';
import Contato from './pages/Contacto';
import NotFound from './pages/NotFound';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contato />} />

    {/* Rota para páginas inexistentes */}
    <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
       <WhatsAppButton />
       </>
  );
}

export default App;
