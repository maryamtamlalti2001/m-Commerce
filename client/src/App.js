import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Products from './component/Products'
import About from './component/About'

import {Routes, Route, BrowserRouter, Router} from 'react-router-dom';
import Product from './component/Product';

function App() {
  return (
  <div>
 
    <Navbar/>
  <Routes>
  
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/products/:id" element={<Product/>} />
    
   
    
    
  </Routes>
  
  </div>

  );
}

export default App;
