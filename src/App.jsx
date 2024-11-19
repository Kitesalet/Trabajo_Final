import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles/App.css";
import AddProduct from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Sandwichería El Jeringa
            </Link>
            <div className="" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {user ? (
                  <>
                    <li className="nav-item px-3">
                      <span className="navbar-text">Welcome, {user.email}</span>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => auth.signOut()}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/product/:productId"
            element={<ProductDetail user={user} />}
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
