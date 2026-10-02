import { Routes, Route } from 'react-router-dom';
import { StudioLanding } from './components/landing/StudioLanding';
import { PageTransition } from './components/ui/PageTransition';
import { FamZeeProvider } from './context/FamZeeContext';
import { ThemeProvider } from './context/ThemeContext';
import { DemoFamilyProvider } from './context/DemoFamilyContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Feed } from './pages/Feed';
import { PublicFeed } from './pages/PublicFeed';
import { FamilyProfile } from './pages/FamilyProfile';
import { FamilyRootsPage } from './pages/FamilyRootsPage';
import { TimelinePage } from './pages/TimelinePage';
import { FamilyTreePage } from './pages/FamilyTreePage';
import { Events } from './pages/Events';
import { Albums } from './pages/Albums';
import { Memories } from './pages/Memories';
import { Messages } from './pages/Messages';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Invitations } from './pages/Invitations';
import { CreateFamilyPage } from './pages/CreateFamilyPage';
import { FeatureDetailPage } from './pages/FeatureDetailPage';

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
        <Route path="/public-feed" element={<ProtectedRoute><PublicFeed /></ProtectedRoute>} />
        <Route path="/family" element={<ProtectedRoute><FamilyProfile /></ProtectedRoute>} />
        <Route path="/roots" element={<ProtectedRoute><FamilyRootsPage /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><TimelinePage /></ProtectedRoute>} />
        <Route path="/tree" element={<ProtectedRoute><FamilyTreePage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/albums" element={<ProtectedRoute><Albums /></ProtectedRoute>} />
        <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/invitations" element={<ProtectedRoute><Invitations /></ProtectedRoute>} />
        <Route path="/create-family" element={<ProtectedRoute><CreateFamilyPage /></ProtectedRoute>} />
        <Route
          path="/capsule"
          element={
            <ProtectedRoute>
              <FeatureDetailPage
                title="Family Time Capsule"
                copy="Save special messages, photos and videos to open at a future family celebration or milestone."
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voices"
          element={
            <ProtectedRoute>
              <FeatureDetailPage
                title="Voices of Our Elders"
                copy="Preserve family stories, recipes, languages and traditions through optional audio recordings."
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/celebrations"
          element={
            <ProtectedRoute>
              <FeatureDetailPage
                title="Family Celebrations"
                copy="Create shared calendars, anniversary reminders, reunion invitations and collaborative albums."
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FamZeeProvider>
        <DemoFamilyProvider>
          <AppRoutes />
        </DemoFamilyProvider>
      </FamZeeProvider>
    </ThemeProvider>
  );
}

export default App;
