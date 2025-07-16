import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sobre from './pages/Sobre';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;
