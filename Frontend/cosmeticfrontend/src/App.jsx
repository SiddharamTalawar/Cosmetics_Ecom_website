import { useState } from 'react'

import './App.css'
import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
// import { MyContext } from "./MyContext";
import './index.css'

function App() {
  
   
  return (
    
    <BrowserRouter>
    <Routes>
    
    <Route path="/shop" element={<Shop />} />
    <Route path="/cart" element={<Cart />} />
      
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
