import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './AppProvider.jsx'
import AuthProvider from './state/context/AuthContext.jsx'
import UserProvider from './state/context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>



      <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserProvider>
    

    
    
    </AppProvider>,
  </StrictMode>
)
