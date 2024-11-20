import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

function Navbar({ user, cartCount, showModal, closeModal, handleCartClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Sandwichería El Jeringa
        </Link>
        <div id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item px-3 d-flex">
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
                  <Link
                    className="btn btn-outline-primary nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-success nav-link"
                    to="/register"
                  >
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-dark"
                    onClick={handleCartClick}
                  >
                    <FaShoppingCart />
                    {cartCount > 0 && (
                      <span className="badge bg-danger ms-2">{cartCount}</span>
                    )}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {showModal && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Compra realizada!</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Los sandwiches fueron comprados!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
