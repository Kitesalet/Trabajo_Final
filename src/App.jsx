import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/App.css";
import AddProduct from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleCartClick = () => {
    if (cartCount > 0) {
      setShowModal(true);
      setCartCount(0);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          user={user}
          cartCount={cartCount}
          setCartCount={setCartCount}
          showModal={showModal}
          setShowModal={setShowModal}
          handleAddToCart={handleAddToCart}
          closeModal={closeModal}
          handleCartClick={handleCartClick}
        />

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/product/:productId"
            element={
              <ProductDetail user={user} handleAddToCarter={handleAddToCart} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProduct" element={<AddProduct user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
