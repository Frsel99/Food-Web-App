import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/Landing/landing';
import HomePage from './components/Home/home';
import Details from './components/Details/details'
import CreateRecipe from './components/Create/create';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/recipe/:id' element={<Details />} />
          <Route path='/create' element={<CreateRecipe />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
