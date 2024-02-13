import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StatusContextProvider from './context/StatusContext.tsx'
import TaskContextProvider from './context/TaskContext.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import HeaderContextProvider from './context/HeaderContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <HeaderContextProvider>
        <TaskContextProvider>
          <StatusContextProvider>
            <App />
          </StatusContextProvider>
        </TaskContextProvider>
      </HeaderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)
