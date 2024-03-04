
import './App.css'
import './index.css'
import { MainPage } from './components/MainPage'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { LoggingPage } from './components/LoggingPage'
function App() {
 

  return (
  
  <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/:id' element={<LoggingPage/>} />
        </Routes>
  </Router>
      
    
  )
}

export default App
