import LandingPage from './LandingPage'
import LoginPage from './pages/auth/LoginPage'

export default function App() {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/+$/, '') || '/'
      : '/'

  return pathname === '/login' ? <LoginPage /> : <LandingPage />
}
