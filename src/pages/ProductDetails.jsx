import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:8080/api/users/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProduct(res.data);
    } catch (err) {
      alert("Failed to load product ❌");
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      for (let i = 0; i < qty; i++) {
        await axios.post(`http://localhost:8080/api/users/cart/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert("Added To Cart Successfully 🛒");
    } catch (err) {
      alert("Add To Cart Failed ❌");
    }
  };

  if (!product) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/products")} style={styles.backBtn}>
        ← Back to Products
      </button>

      <div style={styles.wrapper}>
        <div style={styles.left}>
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
        </div>

        <div style={styles.right}>
          <div style={styles.badges}>
            <span style={styles.category}>{product.category}</span>
            <span style={styles.stock}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
          </div>

          <h1>{product.name}</h1>

          <p style={styles.price}>₹{product.price}</p>

          <p style={styles.shortDesc}>
            {product.description}
          </p>

          <div style={styles.qtyBox}>
            <button
              style={styles.qtyBtn}
              onClick={() => qty > 1 && setQty(qty - 1)}
            >
              -
            </button>

            <span style={styles.qtyText}>{qty}</span>

            <button
              style={styles.qtyBtn}
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          <div style={styles.actionRow}>
            <button style={styles.cartBtn} onClick={addToCart}>
              Add To Cart 🛒
            </button>

            <button style={styles.buyBtn}>
              Buy Now ⚡
            </button>
          </div>
        </div>
      </div>

      <div style={styles.descriptionPanel}>
        <h2>Product Description</h2>
        <p>{product.description}</p>

        <h3 style={{ marginTop: "20px" }}>Why you'll love this product?</h3>
        <ul style={styles.list}>
          <li>Premium quality materials</li>
          <li>Long lasting durability</li>
          <li>Affordable best-in-class pricing</li>
          <li>Trusted by hundreds of customers</li>
          <li>Fast and secure delivery available</li>
        </ul>
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
  backBtn: {
    marginBottom: "20px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  left: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxHeight: "450px",
    objectFit: "cover",
    borderRadius: "14px",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  badges: {
    display: "flex",
    gap: "12px",
    marginBottom: "15px",
  },
  category: {
    background: "#334155",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
  },
  stock: {
    background: "#166534",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
  },
  price: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#22c55e",
    margin: "20px 0",
  },
  shortDesc: {
    color: "#cbd5e1",
    lineHeight: "1.7",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "25px",
  },
  qtyBtn: {
    padding: "8px 15px",
    fontSize: "20px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
  },
  qtyText: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  actionRow: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
  },
  cartBtn: {
    padding: "14px 22px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
  },
  buyBtn: {
    padding: "14px 22px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
  },
  descriptionPanel: {
    marginTop: "30px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "14px",
    lineHeight: "1.8",
  },
  list: {
    marginTop: "10px",
    paddingLeft: "20px",
    color: "#cbd5e1",
  },
};

export default ProductDetails;