import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import SandwichCard from "./SandwichCard";

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
      alert("Tenes que estar logueado para agregar un sandwich!");
      return;
    }
    navigate("/addProduct");
  };

  return (
    <div className="home-container mt-3">
      <h1>Bienvenido a la sandwichería!</h1>
      {user && (
        <button className="btn btn-success my-3" onClick={handleAddNew}>
          Agregar un sandwich
        </button>
      )}

      <div className="sandwich-list">
        {sandwiches.length > 0 ? (
          sandwiches.map((sandwich) => (
            <SandwichCard sandwich={sandwich} key={sandwich.id}></SandwichCard>
          ))
        ) : (
          <h4>No hay sandwiches disponibles...</h4>
        )}
      </div>
    </div>
  );
};

export default Home;
