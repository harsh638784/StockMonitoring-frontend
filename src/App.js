import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./App.css";
import "./index.css";

 import  Home from "./components/Home";
 
import ProtectedRoute from "./components/ProtectedRoute";

//  import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import ProductPage from "./landing_page/products/ProductPage";
import SupportPage from "./landing_page/support/SupportPage";
 

 
import { Login, Signup } from "./pages";

function App() {
  return (
    <CookiesProvider>

       
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard/*" element={<Home/>} /> */}
        
        <Route
          path="/Home/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    
    </CookiesProvider>
  );
}

export default App;
