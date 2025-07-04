import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './section/Footer';
import HeroSection from './section/Hero';
import Testimonials from './section/Testimonials';
import TrustedWorldwide from './section/Trusted';

import AboutPage from './pages/about/Page';
import ContactPage from './pages/contact/Page';
import PackagePage from './pages/package/Page';
import Admin from './pages/admin/Page';
import NotFound from './pages/error/Page';

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedWorldwide />
      <Testimonials />
    </>
  );
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {!isAdminPage && <Navbar />}

      <main className={`${!isAdminPage ? 'min-h-[calc(100vh-80px)] pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/package" element={<PackagePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
