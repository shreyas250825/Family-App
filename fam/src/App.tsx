import { Routes, Route } from 'react-router-dom';
import { StudioLanding } from './components/landing/StudioLanding';
import { PageTransition } from './components/ui/PageTransition';
import { FamZeeProvider } from './context/FamZeeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Feed } from './pages/Feed';
import { FamilyProfile } from './pages/FamilyProfile';
import { Events } from './pages/Events';
import { Albums } from './pages/Albums';
import { Messages } from './pages/Messages';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<StudioLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
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
