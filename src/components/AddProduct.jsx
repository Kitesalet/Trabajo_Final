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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setError("All fields are required");
    }
  };

  if (!user) {
    return <div>You need to be logged in to add a product</div>;
  }

  return (
    <div className="add-product-container container mt-3">
      <h1>Add New Sandwich</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          className="mb-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Description</label>
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
        <label>Price</label>
        <input
          className="mb-4"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button className="btn btn-success col-6" type="submit">
          Add Sandwich
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
