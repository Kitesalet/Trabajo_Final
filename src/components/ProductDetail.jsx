import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "../styles/ProductDetail.css";

const ProductDetail = ({ user, handleAddToCarter }) => {
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
  const [loading, isLoading] = useState(false);

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

  const handleUpdate = async () => {
    isLoading(true);
    try {
      const docRef = doc(db, "sandwiches", productId);
      await updateDoc(docRef, {
        name: newName,
        description: newDescription,
        sku: newSku,
        price: parseFloat(newPrice),
      });
      setIsEditMode(false);
      navigate("/");
    } catch (err) {
      setError("Fallo en actualización de sandwich.");
    }

    isLoading(false);
  };

  const handleDelete = async () => {
    isLoading(true);
    try {
      const docRef = doc(db, "sandwiches", productId);
      await deleteDoc(docRef);
      navigate("/");
    } catch (err) {
      setError("Fallo en eliminación de sandwich");
    }
    isLoading(false);
  };

  const handleAddToCart = () => {
    handleAddToCarter();
    setCartPopup(true);
  };

  const closePopup = () => {
    setCartPopup(false);
  };

  if (!sandwich)
    return (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    );

  return (
    <div
      className="card container my-3 py-2"
      style={{ width: "40rem", height: "100%" }}
    >
      <h2>{sandwich.name}</h2>
      <img
        className="card-img-top"
        src="https://s3.abcstatics.com/abc/sevilla/media/gurme/2023/05/23/s/sandwich-club1-kqJF--1248x698@abc.jpg"
      ></img>{" "}
      <p className="fw-bold">{sandwich.description}</p>
      <p>Precio: ${sandwich.price}</p>
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
                Editar
              </button>

              <button className="btn btn-danger col-6" onClick={handleDelete}>
                {!loading ? (
                  <p className="mb-0 text-light">Eliminar</p>
                ) : (
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                )}
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
                {!loading ? (
                  <p className="mb-0">Editar</p>
                ) : (
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
              <div className="mb-2">
                <button
                  className="btn btn-danger col-6"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </>
      )}
      {!user && (
        <button className="btn btn-success" onClick={handleAddToCart}>
          Comprar
        </button>
      )}
      {cartPopup && (
        <div className="cart-popup">
          <div className="popup-content">
            <h3>Objeto añadido al carrito!</h3>
            <button className="btn btn-primary" onClick={closePopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
