import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import './index.css';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  // Simple routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Normalize route
  const route = currentRoute === '' ? '/' : currentRoute;

  if (route === '/admin') {
    if (!isAuthenticated) {
      return (
        <>
          <SEO title="Admin Login" noIndex={true} />
          <AdminLogin />
        </>
      );
    }
    return (
      <>
        <SEO title="Admin Dashboard" noIndex={true} />
        <AdminDashboard />
      </>
    );
  }

  if (route === '/privacy') {
    return (
      <>
        <SEO title="Privacy Policy" description="Privacy Policy for Segun Salako's Portfolio" />
        <Privacy />
      </>
    );
  }

  // Home page (default route)
  return (
    <>
      <SEO />
      <Header />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HelmetProvider>
          <ContentProvider>
            <ProjectsProvider>
              <ErrorBoundary>
                <AppContent />
              </ErrorBoundary>
            </ProjectsProvider>
          </ContentProvider>
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
