import React from 'react'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
export default function Navbar() {
  const state = useSelector((state)=> state.handleCart)
  
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <Link class="navbar-brand fw-bold fs-4" to='#'>
        MyStore
        </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/products">Products</Link>
          
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/about">About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="buttons">
        <Link to="#" className="btn btn-outline-dark">
            <i className="fa fa-login"></i>
            Login
        </Link>
        <Link to="#" className="btn btn-dark">
            <i className="fa fa-login"></i>
            Register
        </Link>
        <Link to="#" className="btn btn-outline-dark">
            <i className="fa fa-shopping-cart me-1"></i>
            Cart ({state.length})
        </Link>
      </div>
    </div>
  </div>
</nav>
<hr />
      
    </div>
  )
}
