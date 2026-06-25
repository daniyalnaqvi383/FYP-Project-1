import './App.css'
import Hero from './Component/Hero/Hero';
import Login from './Component/Login/Login';
import Navbar from './Component/Navbar/Navbar';
import SignUP from './Component/Sign/signUP';
import { Route, Routes } from "react-router-dom";
import ProductDetail from './Pages/ProductDetail';
import Cartpage from './Pages/Cartpage';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';
import ProductGrid from './Pages/ProductGrid';
import Chatbot from './Component/Chatbot/Chatbot';
import Footer from './Component/Footer/Footer';
import Returnexchange from './Pages/Returnexchange';
import AboutUS from './Pages/AboutUS';
import ShippingPolicy from './Pages/ShippingPolicy';
import FAQs from './Pages/FAQs';
import Careers from './Pages/Careers';
import ScrollToTop from './ScrollToTop';
import TryOnModal from './Pages/TryOnModal';

function App() {
  return (
    <>
      <ScrollToTop />
  
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
         <Route path="/CartPage" element={<Cartpage/>} />
         <Route path="/Checkout" element={<Checkout/>} />
         <Route path="/shop" element={<ProductGrid />} />
         <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/returnexchange" element={<Returnexchange/>} />
        <Route path="/Aboutus" element={<AboutUS/>} />
        <Route path="/ShippingPolicy" element={<ShippingPolicy/>} />
      
        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/careers" element={<Careers/>} />
       // ⚡ Space saaf karke clean lowercase path lagayein
<Route path="/virtual-room" element={<TryOnModal isOpen={true} onClose={() => window.history.back()} product={{}} />} />

       

      







      </Routes>
      <Chatbot/>
      <Footer/>
    </>
  );
}

export default App; 
