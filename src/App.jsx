import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import Weather from './components/Weather';
import Spotify from './components/Spotify';


function App() {
  return (
    <div className="App">
      <div className="MainContainer">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout></Layout>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="contact" element={<Contact></Contact>}></Route>
                <Route path="spotify" element={<Spotify></Spotify>}></Route>
              </Route>
          </Routes>
        </BrowserRouter>
        <div className="WeatherContainer">
            <Weather></Weather>
        </div>
      </div>
  
    </div>
  );
}

export default App;
