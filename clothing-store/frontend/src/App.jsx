// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';

// import Home from './pages/Home';       // Home import karo
// import Shop from './pages/Shop';
// import ProductDetail from './pages/ProductDetail';
// import Cart from './pages/Cart';
// import { CartProvider } from './context/CartContext';

// import Checkout from './pages/Checkout';
// import OrderSuccess from './pages/OrderSuccess';

// import Login from './pages/Login';
// import Register from './pages/Register';
// import MyOrders from './pages/MyOrders';

// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />          {/* Hhave Home page alag thase */}
//           <Route path="/" element={<Shop />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
// <Route path="/order-success" element={<OrderSuccess />} />
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />
// <Route path="/my-orders" element={<MyOrders />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import NewArrivals from './pages/NewArrivals'; // 👈 NewArrivals import karyu
import { CartProvider } from './context/CartContext';
import ScrollToTop from './ScrollToTop';
import UserProfile from './pages/UserProfile';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/new-arrivals" element={<NewArrivals />} /> {/* 👈 NewArrivals route set karyo */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}