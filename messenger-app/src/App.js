import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import Painel from './components/Painel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact  element={<Login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/painel' element={<Painel/>}/>
      </Routes>
    </Router>
  );
}

export default App;
