import { Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductShowcase from './pages/ProductShowcase'
import Admin from './pages/Admin'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductShowcase />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/edit/:id" element={<Admin />} />
    </Routes>
  )
}

export default App
