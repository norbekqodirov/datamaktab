import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnrollModal from './components/EnrollModal';
import ScrollToTop from './components/ScrollToTop';

const Home         = lazy(() => import('./pages/Home'));
const About        = lazy(() => import('./pages/About'));
const Team         = lazy(() => import('./pages/Team'));
const Education    = lazy(() => import('./pages/Education'));
const Admission    = lazy(() => import('./pages/Admission'));
const News         = lazy(() => import('./pages/News'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Contact      = lazy(() => import('./pages/Contact'));
const Admin        = lazy(() => import('./pages/Admin'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

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
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
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
