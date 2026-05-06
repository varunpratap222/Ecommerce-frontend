import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(result);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/users/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      setError("Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(`http://localhost:8080/api/users/cart/${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Added To Cart Successfully 🛒");
    } catch (err) {
      alert("Add To Cart Failed ❌");
    }
  };

  if (loading) return <h2 style={{ color: "white", textAlign: "center" }}>Loading products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={styles.container}>
      
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Ecommerce</h2>

        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.navBtns}>
          <button onClick={() => navigate("/cart")} style={styles.cartBtn}>My Cart 🛒</button>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.banner}>
        <h1>🔥 Mega Shopping Sale</h1>
        <p>Best products at unbeatable prices</p>
      </div>

      <h2 style={styles.heading}>Discover Our Latest Collection</h2>

      <div style={styles.grid}>
        {filteredProducts.map((p, idx) => (
          <div
            key={p.id ?? idx}
            style={styles.card}
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.imageUrl} alt={p.name} style={styles.image} />

            <div style={styles.badgeRow}>
              <span style={styles.category}>{p.category}</span>
              <span style={styles.stock}>{p.stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>

            <h3>{p.name}</h3>
            <p style={styles.price}>₹{p.price}</p>

            <button
              style={styles.addBtn}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p.id);
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: "20px 35px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#38bdf8",
  },
  search: {
    width: "350px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  navBtns: {
    display: "flex",
    gap: "12px",
  },
  cartBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  banner: {
    background: "linear-gradient(to right,#0ea5e9,#1d4ed8)",
    padding: "35px",
    borderRadius: "14px",
    marginBottom: "30px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
    gap: "25px",
  },
  card: {
    background: "#1e293b",
    borderRadius: "14px",
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 0 12px rgba(0,0,0,0.3)",
  },
  image: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "12px",
  },
  badgeRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "12px",
  },
  category: {
    background: "#334155",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  stock: {
    background: "#166534",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#22c55e",
    margin: "10px 0",
  },
  addBtn: {
    marginTop: "10px",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#38bdf8",
    color: "white",
    fontWeight: "bold",
  },
};

export default Products;