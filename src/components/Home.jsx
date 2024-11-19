// src/components/Home.js

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = ({ user }) => {
  const [sandwiches, setSandwiches] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSandwiches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sandwiches"));
        console.log(querySnapshot);
        const sandwichesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(sandwichesData);
        setSandwiches(sandwichesData);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchSandwiches();
  }, []);

  const handleAddNew = () => {
    if (!user) {
      alert("You need to be logged in to add a new sandwich.");
      return;
    }
    navigate("/addProduct");
  };

  return (
    <div className="home-container container mt-3">
      <h2>Welcome to Our Sandwicheria</h2>

      {user && (
        <button className="add-sandwich-btn" onClick={handleAddNew}>
          Add New Sandwich
        </button>
      )}

      <div className="sandwich-list">
        {sandwiches.length > 0 ? (
          sandwiches.map((sandwich) => (
            <div key={sandwich.id} className="sandwich-item">
              <h3>{sandwich.name}</h3>
              <p>{sandwich.description}</p>
              <p>Price: ${sandwich.price}</p>
              <p>
                <strong>SKU: {sandwich.sku}</strong>
              </p>
              <button
                className="btn"
                onClick={() => navigate(`/product/${sandwich.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <h4>No sandwiches available...</h4>
        )}
      </div>
    </div>
  );
};

export default Home;
