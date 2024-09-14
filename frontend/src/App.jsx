import { Route, Routes } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.route'
import Home from './routes/home/home.route'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
