
import { useAppBootstrap } from './src/hooks/useAppBootstrap';
function AppContent() {

  useAppBootstrap();


  return (
    <>
      <RootNavigator />
      <StatusBar style="dark" />
    </>
  );
}

export default function App() {
        <AppContent />