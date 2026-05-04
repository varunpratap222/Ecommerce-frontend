import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/products/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setProduct(res.data);
    } catch (err) {
      alert("Failed to load product ❌");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await axios.post(`http://localhost:8080/api/users/cart/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      alert("Product Added To Cart 🛒");
    } catch (err) {
      alert("Failed To Add Cart ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <button onClick={() => navigate("/products")} style={styles.backBtn}>← Back</button>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.imageBox}>
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
        </div>

        <div style={styles.infoBox}>
          <h1>{product.name}</h1>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.desc}>{product.description}</p>
          <h2>₹{product.price}</h2>
          <p>Available Stock: {product.stock}</p>

          <button onClick={addToCart} style={styles.cartBtn}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: "30px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  backBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logout: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  wrapper: {
    display: "flex",
    gap: "40px",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    alignItems: "center",
  },
  imageBox: {
    flex: 1,
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  infoBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  category: {
    color: "#38bdf8",
    fontWeight: "bold",
  },
  desc: {
    lineHeight: "1.6",
  },
  cartBtn: {
    marginTop: "20px",
    width: "200px",
    padding: "14px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default ProductDetails;