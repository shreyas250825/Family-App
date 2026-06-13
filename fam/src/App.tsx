import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ScrollAnimationSection } from './components/sections/ScrollAnimationSection';
import { ProductSection } from './components/sections/ProductSection';
import { BetaSection } from './components/sections/BetaSection';
import { Footer } from './components/sections/Footer';
import { PageTransition } from './components/ui/PageTransition';
import { DemoTour, DemoTourLauncher } from './components/ui/DemoTour';
import { DemoTourProvider, useTourAutoPrompt } from './context/DemoTourContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FamilyProfile } from './pages/FamilyProfile';
import { Events } from './pages/Events';
import { Albums } from './pages/Albums';
import { Messages } from './pages/Messages';

function LandingPage() {
  const handleCTAClick = (action: 'beta' | 'learn') => {
    if (action === 'beta') {
      document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-hero">
      <Navbar />
      <HeroSection onCTAClick={handleCTAClick} />
      <ScrollAnimationSection />
      <ProductSection />
      <BetaSection />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  useTourAutoPrompt();

  return (
    <>
      <PageTransition>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/family" element={<FamilyProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </PageTransition>
      <DemoTour />
      <DemoTourLauncher />
    </>
  );
}

function App() {
  return (
    <DemoTourProvider>
      <AppRoutes />
    </DemoTourProvider>
  );
}

export default App;
