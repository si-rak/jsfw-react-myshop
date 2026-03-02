import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';

import CheckoutSuccessPage from './pages/CheckoutSuccessPage/CheckoutSuccessPage';
import CartPage from './pages/CartPage/CartPage';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import ContactPage from './pages/ContactPage/ContactPage';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout toggleTheme={toggleTheme} theme={theme} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
