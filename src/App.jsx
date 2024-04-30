import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route index element={<Home></Home>}></Route>
              <Route path="contact" element={<Contact></Contact>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
