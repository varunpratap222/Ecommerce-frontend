import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/products", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully ✅");

      setForm({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        stock: "",
        category: "",
      });

      fetchProducts();
    } catch (err) {
      alert("Failed to add product ❌");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Deleted Successfully");
      fetchProducts();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div style={styles.container}>
      <button onClick={logout} style={styles.logout}>Logout</button>
      <h1>Admin Product Management</h1>

      <form onSubmit={addProduct} style={styles.form}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} style={styles.input} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={styles.input} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={styles.input} required />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} style={styles.input} required />
        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} style={styles.input} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.addBtn}>Add Product</button>
      </form>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img src={p.imageUrl} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            <p>Category: {p.category}</p>
            <button onClick={() => deleteProduct(p.id)} style={styles.deleteBtn}>Delete</button>
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
    color: "white",
  },
  logout: {
    marginBottom: "20px",
    padding: "10px",
    cursor: "pointer",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  addBtn: {
    padding: "10px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
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
  deleteBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "crimson",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminProducts;
