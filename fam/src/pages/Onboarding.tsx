import { useNavigate } from 'react-router-dom';
import { CreateFamilyWizard } from '../components/family/CreateFamilyWizard';
import { useTheme } from '../context/ThemeContext';
import { useFamZee } from '../context/FamZeeContext';

export function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useFamZee();
  const { appearance, toggleAppearance } = useTheme();

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <button
          type="button"
          className="fam-btn"
          onClick={() => {
            completeOnboarding('Our Family');
            navigate('/dashboard', { replace: true });
          }}
        >
          Skip for now
        </button>
        <button type="button" className="fam-btn" onClick={toggleAppearance}>
          {appearance === 'light' ? 'Dark theme' : 'Light theme'}
        </button>
      </div>
      <CreateFamilyWizard asOnboarding />
    </div>
  );
}
