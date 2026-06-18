import LandingPage from './LandingPage'
import LoginPage from './pages/auth/LoginPage'
import CitizenManagementPage from './pages/citizens/CitizenManagementPage'

export default function App() {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/+$/, '') || '/'
      : '/'

  if (pathname === '/login') {
    return <LoginPage />
  }

  if (pathname === '/ciudadanos') {
    return <CitizenManagementPage />
  }

  return <LandingPage />
}
