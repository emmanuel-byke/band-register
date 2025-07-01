import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './AppProvider.jsx'
import AuthProvider from './state/context/AuthContext.jsx'
import UserProvider from './state/context/UserContext.jsx'
import ActivityProvider from './state/context/ActivityContext.jsx'
import AttendanceProvider from './state/context/AttendanceContext.jsx'
import DivisionProvider from './state/context/DivisionContext.jsx'
import FeedbackProvider from './state/context/FeedbackContext.jsx'
import ScheduleProvider from './state/context/ScheduleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>



      <UserProvider>
        <AuthProvider>
          <ActivityProvider>
            <AttendanceProvider>
              <DivisionProvider>
                <FeedbackProvider>
                  <ScheduleProvider>
                    <App />
                  </ScheduleProvider>
                </FeedbackProvider>
              </DivisionProvider>
            </AttendanceProvider>
          </ActivityProvider>
        </AuthProvider>
      </UserProvider>
    

    
    
    </AppProvider>
  </StrictMode>
)
