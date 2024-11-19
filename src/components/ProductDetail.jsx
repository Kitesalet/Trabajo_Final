// src/components/ProductDetail.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { auth } from "../firebase/firebaseConfig";
import "../styles/ProductDetail.css";

const ProductDetail = ({ user }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [sandwich, setSandwich] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cartPopup, setCartPopup] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newSku, setNewSku] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSandwich = async () => {
      try {
        const docRef = doc(db, "sandwiches", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSandwich(docSnap.data());
          setNewName(docSnap.data().name);
          setNewDescription(docSnap.data().description);
          setNewPrice(docSnap.data().price);
          setNewSku(docSnap.data().sku);
        } else {
          setError("No such sandwich exists!");
        }
      } catch (err) {
        setError("Failed to fetch sandwich details");
      }
    };

    fetchSandwich();
  }, [productId]);

  // Handle the update of the sandwich details
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "sandwiches", productId);
      await updateDoc(docRef, {
        name: newName,
        description: newDescription,
        sku: newSku,
        price: parseFloat(newPrice),
      });
      setIsEditMode(false); // Exit edit mode after updating
      navigate("/");
    } catch (err) {
      setError("Failed to update sandwich.");
    }
  };

  // Handle the deletion of the sandwich
  const handleDelete = async () => {
    try {
      const docRef = doc(db, "sandwiches", productId);
      await deleteDoc(docRef);
      navigate("/"); // Redirect to home after deleting
    } catch (err) {
      setError("Failed to delete sandwich.");
    }
  };

  // Handle "add to cart" action
  const handleAddToCart = () => {
    setCartPopup(true);
  };

  // Close cart popup
  const closePopup = () => {
    setCartPopup(false);
  };

  if (!sandwich)
    return (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <div className="product-detail-container container mt-3">
      <h2>{sandwich.name}</h2>
      <p>{sandwich.description}</p>
      <p>Price: ${sandwich.price}</p>
      <p>SKU: ${sandwich.sku}</p>

      {error && <p className="error-message">{error}</p>}

      {user && (
        <>
          {!isEditMode ? (
            <>
              <button
                className="btn btn-success col-6 mb-2"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
              <button className="btn btn-danger col-6" onClick={handleDelete}>
                Delete
              </button>
            </>
          ) : (
            <>
              <input
                className="col-8 mb-1"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                className="col-8 mb-1"
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <input
                className="col-8 mb-1"
                type="text"
                value={newSku}
                onChange={(e) => setNewSku(e.target.value)}
              />
              <input
                className="col-8 mb-1"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button
                className="btn btn-success col-6 mb-2"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="btn btn-danger col-6"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </>
      )}

      {!user && (
        <button className="btn btn-success" onClick={handleAddToCart}>
          Buy
        </button>
      )}

      {cartPopup && (
        <div className="cart-popup">
          <div className="popup-content">
            <h3>Item added to your cart!</h3>
            <button className="btn btn-primary" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
