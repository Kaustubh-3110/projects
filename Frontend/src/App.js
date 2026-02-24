import './App.css';
import LoginPage from './Pages/Loginpage';
import Signuppage from './Pages/Signuppage';
import Homepage from './Pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbarcomponents from './Components/Navbarcomponents';
import Shoppage from './Pages/Shoppage';
import Footercomponent from './Components/Footercomponent';
import Contactpage from './Pages/Contactpage';
import Productpage from './Pages/Productpage';
import Orderspage from './Pages/Orderspage';
import Aboutpage from './Pages/About';
import Whishlistpage from './Pages/Whishlistpage';
import Cartpage from './Pages/Cartpage';
import { useState, useEffect } from 'react';
import axios from "./api/axiosConfig";
import ProtectedRoute from './Components/ProtectedRoute';
import OrderDetails from "./Pages/OrderDetails";
import PaymentPage from "./Pages/PaymentPage";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchtext, setSearchText] = useState("");
  const [likesproducts, setLikesproducts] = useState([]);
  const [cartproducts, setCartproducts] = useState(() => {
    const savedCart = localStorage.getItem("cartproducts");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cartproducts", JSON.stringify(cartproducts));
  }, [cartproducts]);

  // Fetch products once
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Proper filtering (DO NOT mutate products)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchtext.toLowerCase()) ||
    product.category.toLowerCase().includes(searchtext.toLowerCase())
  );

  const handlelike = (id) => {
    if (likesproducts.includes(id)) {
      setLikesproducts(likesproducts.filter(item => item !== id));
    } else {
      setLikesproducts([...likesproducts, id]);
    }
  };

  return (
    <BrowserRouter>
      <Navbarcomponents
        searchtext={searchtext}
        setSearchText={setSearchText}
      />

      <Routes>

        <Route path="/" element={
          <Homepage
            products={filteredProducts}
            likesproducts={likesproducts}
            handlelike={handlelike}
            cartproducts={cartproducts}
            setCartproducts={setCartproducts}
            loading={loading}
          />
        } />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/orders" element={<ProtectedRoute><Orderspage /></ProtectedRoute>} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />  
        <Route path="/payment/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

        <Route path="/wishlist" element={
          <Whishlistpage
            likesproducts={likesproducts}
            products={products}
            setLikesproducts={setLikesproducts}
            handlelike={handlelike}
          />
        } />

        <Route path="/cart" element={
          <Cartpage
            cartproducts={cartproducts}
            setCartproducts={setCartproducts}
          />
        } />

        <Route path="/shoppage" element={
          <Shoppage
            products={filteredProducts}
            likesproducts={likesproducts}
            cartproducts={cartproducts}
            setCartproducts={setCartproducts}
            setLikesproducts={setLikesproducts}
          />
        } />

        <Route path="/product" element={
          <Productpage
            products={filteredProducts}
            likesproducts={likesproducts}
            cartproducts={cartproducts}
            setCartproducts={setCartproducts}
            setLikesproducts={setLikesproducts}
          />
        } />

      </Routes>

      <Footercomponent />
    </BrowserRouter>
  );
}

export default App;
