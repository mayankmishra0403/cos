import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Academics from './pages/Academics';
import Placement from './pages/Placement';
import AITutor from './pages/AITutor';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/placements" element={<Placement />} />
            <Route path="/ai-tutor" element={<AITutor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;