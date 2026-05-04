import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();

  const emptyForm = {
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
    category: "",
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const getToken = () => localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/products", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/users/products/${editId}`, form, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        alert("Product Updated Successfully ✅");
      } else {
        await axios.post("http://localhost:8080/api/users/products", form, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        alert("Product Added Successfully ✅");
      }

      setForm(emptyForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      alert("Operation Failed ❌");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
    window.scrollTo(0, 0);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/products/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchProducts();
    } catch (err) {
      alert("Delete Failed ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <h1>Inventory</h1>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        <h2>{editId ? "Update Product" : "Add New Product"}</h2>
        <div style={styles.formGrid}>
          <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} style={styles.input} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={styles.input} required />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={styles.input} required />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} style={styles.input} required />
          <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} style={styles.input} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} style={styles.input} required />
        </div>
        <button type="submit" style={styles.primaryBtn}>{editId ? "Update Product" : "Add Product"}</button>
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
            <div style={styles.actionBox}>
              <button onClick={() => handleEdit(p)} style={styles.editBtn}>Edit</button>
              <button onClick={() => deleteProduct(p.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "25px", minHeight: "100vh", background: "#020617", color: "white" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" },
  logout: { padding: "10px 18px", cursor: "pointer", borderRadius: "8px", border: "none" },
  formCard: { background: "#1e293b", padding: "25px", borderRadius: "14px", marginBottom: "30px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginTop: "15px" },
  input: { padding: "12px", borderRadius: "8px", border: "none" },
  primaryBtn: { marginTop: "15px", padding: "12px 18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "20px" },
  card: { background: "#1e293b", borderRadius: "12px", padding: "15px", textAlign: "center", boxShadow: "0 0 10px rgba(0,0,0,0.3)" },
  image: { width: "100%", height: "170px", objectFit: "cover", borderRadius: "10px" },
  actionBox: { display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" },
  editBtn: { padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer" },
  deleteBtn: { padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer" }
};

export default AdminProducts;
