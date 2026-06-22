import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { ShowcaseSection } from './components/sections/ShowcaseSection';
import { CTASection } from './components/sections/CTASection';
import { Footer } from './components/sections/Footer';
import { PageTransition } from './components/ui/PageTransition';
import { FamZeeProvider } from './context/FamZeeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { FamilyProfile } from './pages/FamilyProfile';
import { Events } from './pages/Events';
import { Albums } from './pages/Albums';
import { Messages } from './pages/Messages';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/family" element={<ProtectedRoute><FamilyProfile /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/albums" element={<ProtectedRoute><Albums /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <FamZeeProvider>
      <AppRoutes />
    </FamZeeProvider>
  );
}

export default App;
