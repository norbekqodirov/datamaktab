import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Education from './pages/Education';
import Admission from './pages/Admission';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import EnrollModal from './components/EnrollModal';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/maktabpanel/*" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maktab-haqida" element={<About />} />
            <Route path="/maktab-haqida/jamoa" element={<Team />} />
            <Route path="/talim" element={<Education />} />
            <Route path="/qabul" element={<Admission />} />
            <Route path="/blog" element={<News />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/aloqa" element={<Contact />} />
            <Route path="/maktabpanel/*" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Routes>
          <Route path="/maktabpanel/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
        <EnrollModal />
      </div>
    </Router>
  );
}
