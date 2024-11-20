import { useNavigate } from "react-router-dom";

function SandwichCard({ sandwich }) {
  const navigate = useNavigate();

  return (
    <div>
      <div key={sandwich.id} className="sandwich-item">
        <h3>{sandwich.name}</h3>
        <img
          className="card-img-top"
          src="https://s3.abcstatics.com/abc/sevilla/media/gurme/2023/05/23/s/sandwich-club1-kqJF--1248x698@abc.jpg"
        ></img>
        <p className="fw-bold">{sandwich.description}</p>
        <p>Precio: ${sandwich.price}</p>
        <p>
          <em>{sandwich.sku}</em>
        </p>
        <button
          className="btn"
          onClick={() => navigate(`/product/${sandwich.id}`)}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}

export default SandwichCard;
