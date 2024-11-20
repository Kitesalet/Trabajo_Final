import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/AddProduct.css";

const AddProduct = ({ user }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    isLoading(true);

    if (name && description && price && sku) {
      try {
        await addDoc(collection(db, "sandwiches"), {
          name,
          description,
          sku,
          price: parseInt(price),
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    } else {
      setError("Todos los campos son requeridos!");
    }
    isLoading(false);
  };

  if (!user) {
    return <div>Tenes que estar logueado para agregar un producto!</div>;
  }

  return (
    <div className="add-product-container container mt-3">
      <h1>Agregar Nuevo Sandwich</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          className="mb-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Descripción</label>
        <input
          className="mb-1"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>SKU</label>
        <input
          className="mb-1"
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <label>Precio</label>
        <input
          className="mb-4"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button className="btn btn-success col-6" type="submit">
          {!loading ? (
            <p className="mb-0">Agregar Sandwich</p>
          ) : (
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
