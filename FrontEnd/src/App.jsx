import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './section/Footer';
import HeroSection from './section/Hero';
import Testimonials from './section/Testimonials';
import TrustedWorldwide from './section/Trusted';
import ServicesWeCover from './section/Services';


import AboutPage from './pages/about/Page';
import ContactPage from './pages/contact/Page';
import PackagePage from './pages/package/Page';
import Admin from './pages/admin/Page';
import AdminLogin from './pages/admin/AdminLogin';
import NotFound from './pages/error/Page';
import Process from './section/Process';
import TrustBadges from './section/TrustBadges';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesWeCover />
      <Process />
      <TrustedWorldwide />
      <Testimonials />
      <TrustBadges />
    </>
  );
}

function ProtectedAdminRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    alert('Please login as admin first.');
    return <Navigate to="/admin/login" replace />;
  }
  return children;
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

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
