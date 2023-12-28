import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import { ShoppingCartProvider } from './Contexts/ShoppingCartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import About from './Pages/About';
import Footer from './Pages/Footer';
import ProductList from './Components/ProductList'
import ProductDetails from './Components/ProductDetails'
import ShoppingCart from './Components/ShoppingCart';
import Checkout from './Components/Checkout';
import Supports from './Pages/Supports';

import './App.css'

function App() {

  const FooterWithNavigation = () => {
    const navigate = useNavigate();

    const routesWithoutFooter = ['/checkout'];
    const shouldRenderFooter = !routesWithoutFooter.includes(window.location.pathname);

    return (
      <>
        {shouldRenderFooter && <Footer />}
        <ToastContainer />
      </>
    );
  };
 

  return (
    <Router>
       <ShoppingCartProvider>
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/supports" element={<Supports />} />
      </Routes>
    {/* Render FooterWithNavigation instead */}
    <FooterWithNavigation />
      
    </>
    </ShoppingCartProvider>
  </Router>
  )
}

export default App
