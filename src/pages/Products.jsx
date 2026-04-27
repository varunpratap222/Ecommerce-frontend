import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Products() {
  const navigate = useNavigate();
    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:8080/api/users/products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API RESPONSE:", res.data);
    setProducts(res.data);

  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      setError("Unauthorized ❌ Please login again.");
      navigate("/login");
    } else {
      setError("Failed to load products ❌");
    }
  } finally {
    setLoading(false);
  }
};



  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={styles.container}>
      <button onClick={logout} style={{ marginBottom: "20px" }}>
      Logout
    </button>

      <h1>Products</h1>

      <div style={styles.grid}>
        {products.map((p, idx) => (
          <div key={p.id ?? idx} style={styles.card}>
            <img src={p.imageUrl} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button style={styles.btn}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  btn: {
    marginTop: "10px",
    padding: "8px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Products;